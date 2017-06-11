const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const Constants = require('./environment');
const express = require('express');
const applet = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');
const Roku = require('rokujs');
const io = require('socket.io')(Constants.socketPort);
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

function registerChannel(channel,cb){
    applet.get(`/app-${channel.name}`, (req, res)=> {
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

    mainWindow.loadURL(`${Constants.host}:${Constants.serverPort}`);

    // Turn on dev tools
    // mainWindow.webContents.openDevTools()

    mainWindow.on('closed', ()=> {
        mainWindow = null
    });
}

function discover(){
    Roku.discover((devices) => {

        const options = {
            type: "question",
            buttons: ['Look Again'],
            title: "No Box Found",
            message: "We couldn't find a Roku Box on your network."
        };

        // If no devices found allow them to look again
        if (!devices.length) {
            return dialog.showMessageBox(options,(res)=>{
                if(res === 0) return discover();
            })
        }

        // Let you choose your box, will make it auto choose
        // if only one is found after testing on more than 1
        if (devices.length > 0){

            const boxes = devices.map((device)=> `${device.address}`);

            const options = {
                type:    "question",
                buttons: boxes,
                title:   "Choose Your Roku",
                message: "Please Choose Your Roku! 😎"
            }

            dialog.showMessageBox(options, (res)=> {
                roku = new Roku(devices[res].address);
                DEVICEFOUND = true;
                io.emit('connected', true);

                // Register routes for channels
                roku.apps((err,channels)=> {
                    io.emit('channels', channels);
                    channels.forEach((channel=> {
                        registerChannel(channel,(err)=>{
                          if (err) return console.log(err);
                        })
                    }))
                });

            })
        }
        
        // VOLUMES 
        applet.get('/volume-up', (req, res) => {
            roku.press('volumeup');
            return res.status(200).json({ success: true });
        });

        applet.get('/volume-down', (req, res) => {
            roku.press('volumedown');
            return res.status(200).json({ success: true });
        });

        // BUTTONS
        applet.get('/button-home', (req, res) => {
            roku.press('home');
            return res.status(200).json({ success: true });
        })

        applet.get('/button-left', (req, res) => {
            roku.press('left');
            return res.status(200).json({ success: true });
        })

        applet.get('/button-right', (req, res) => {
            roku.press('right');
            return res.status(200).json({ success: true });
        })

        applet.get('/button-down', (req, res) => {
            roku.press('down');
            return res.status(200).json({ success: true });
        })

        applet.get('/button-up', (req, res) => {
            roku.press('up');
            return res.status(200).json({ success: true });
        })

        applet.get('/button-enter', (req, res) => {
            roku.press('enter');
            return res.status(200).json({ success: true });
        })

        applet.get('/button-home', (req, res) => {
            roku.press('home');
            return res.status(200).json({ success: true });
        })

        applet.get('/button-rewind', (req, res) => {
            roku.press('rev');
            return res.status(200).json({ success: true });
        })

        applet.get('/button-fastforward', (req, res) => {
            roku.press('fwd');
            return res.status(200).json({ success: true });
        })

        applet.get('/button-play', (req, res) => {
            roku.press('play');
            return res.status(200).json({ success: true });
        })

        applet.get('/button-select', (req, res) => {
            roku.press('select');
            return res.status(200).json({ success: true });
        })
    });
}

// Run the starter function
discover();

applet.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './app', 'build', 'index.html'));
});

applet.listen(Constants.serverPort, () => {
    console.log(`Example app listening on port ${Constants.serverPort}!`);
});

app.on('ready', createWindow);

// Quit when all windows are closed.
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
