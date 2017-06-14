const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const CONSTANTS = require('./environment');
const Routes = require('./routes/routes');
const express = require('express');
const applet = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');
const Roku = require('rokujs');
const io = require('socket.io')(CONSTANTS.socketPort);
const { dialog } = require('electron');

applet.use(bodyParser.json());
applet.use(express.static(path.resolve(__dirname, './app', 'build')));
applet.use(bodyParser.urlencoded({
    extended: true
}));

let mainWindow;
let DEVICEFOUND = false;
let roku;

// New client connection, let them know if 
// we have found a tv.
io.on('connection', (socket) => {
    socket.on('new', (msg) => {
        if (DEVICEFOUND) io.emit('connected', true);
    });
});

function registerChannel(channel,roku,cb){
    applet.get(`/app-${channel.id}`, (req, res)=> {
        roku.launch({ id: channel.id }, (err) => {
            if (err) return cb(true,err);
            return cb(false);
        });
        res.status(200).json({ success: true });
        return cb(false);
    });
}

function createWindow() {

    mainWindow = new BrowserWindow({ 
        width: 450, 
        height: 600, 
        icon: path.join(__dirname, 'assets/icons/png/64x64.png') ,
        frame: false,
        resizable: false,
    });

    mainWindow.loadURL(`${CONSTANTS.host}:${CONSTANTS.serverPort}`);

    // Turn on dev tools
    //mainWindow.webContents.openDevTools()

    mainWindow.on('closed', ()=> {
        mainWindow = null
    });
}

function controlRoku(info,devices){

    const deviceInfo = info.map((info)=> `${info.friendly_name}`);

    const options = {
        type:    "question",
        buttons: deviceInfo,
        title:   "Choose Your Roku",
        message: "Please Choose Your Roku! 😎"
    }

    dialog.showMessageBox(options, (res)=> {
        roku = new Roku(devices[res].address);
        Routes.registerRoutes(applet,roku);
        DEVICEFOUND = true;
        io.emit('connected', true);

        roku.apps((err,channels)=> {
            io.emit('channels', channels);
            channels.forEach((channel=> {
                registerChannel(channel,roku,(err)=>{
                    if (err) return console.log(err);
                })
            }))
        });
        
    })
}

function discover(){
    Roku.discover((devices) => {

        const options = {
            type: "question",
            buttons: ['Look Again', "Exit"],
            title: "No Box Found",
            message: "We couldn't find a Roku Box on your network."
        };

        // If no devices found allow them to look again
        if (!devices.length) {
            return dialog.showMessageBox(options,(res)=>{
                if(res === 0) return discover();
                if(res === 1) return app.quit();
            })
        }

        // Let you choose your box, will make it auto choose
        // if only one is found after testing on more than 1
        if (devices.length > 0){

            const boxes = devices
            .map((device,idx)=> new Roku(devices[idx].address))
            .map(roku=>{
                return new Promise((resolve) => {
                    roku.deviceInfo(info=>{
                        resolve(info);
                    })
                 });
            });

            Promise
            .all(boxes)
            .then(info=> { 
                controlRoku(info,devices);
            });
        };
    });
}

// Run the starter function
discover();

applet.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './app', 'build', 'index.html'));
});

applet.listen(CONSTANTS.serverPort, () => console.log("Running!"));

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
});
