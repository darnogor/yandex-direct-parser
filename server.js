const express = require('express');
const path    = require('path');
const port    = process.env.PORT || 5000;

let app = express();
app.use(express.static(path.join(__dirname, 'view')));
app.set('views', path.join(__dirname, 'view'));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.post('/ads/get', (req, res) => {
    let words = req.params.query;
});

app.listen(port, () => {console.log(`app running on ${port}`);});