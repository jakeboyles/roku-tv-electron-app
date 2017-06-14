module.exports = {
    registerRoutes(applet,roku){

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
        
    }
}