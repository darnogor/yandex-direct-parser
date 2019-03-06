const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const yandex     = require('yandex-direct-api');
const port       = process.env.PORT || 5000;

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'view')));
app.set('views', path.join(__dirname, 'view'));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.post('/ads/get', (req, res) => {
    let words = req.body.query;
    res.json([{
        name: words,
        contact: ''
    }]);
});

app.listen(port, () => {console.log(`app running on ${port}`);});