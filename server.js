const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const https      = require('https');
const yandexAPI  = require('yandex-direct-api');
const port       = process.env.PORT || 5000;


let yandex = {
    token: null,
    api: null,

    init: () => {
        if (!this.isValid()) {
            https.request('https://oauth.yandex.ru/authorize', {
                response_type: token,
                client_id: '6aab4935cb0145ebb2f3df72e9f2f079'
            }, (res) => {
                console.log(res);
            });
        }
    },
    initWithToken: (token) => {
        if (token) {
            this.token = token;
            this.api = yandexAPI({
                token: token,
                locale: 'ru'
            });
        }
    },
    isValid: () => {
        let isValid = this.token !== null && this.token !== '' && this.api !== null;
        console.log('sdfsdfsdfsdf' + isValid);
        return isValid;
    }
};


let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'view')));
app.set('views', path.join(__dirname, 'view'));

function ignoreFavicon(req, res, next) {
    if (req.originalUrl === '/favicon.ico') {
        res.status(204).json({nope: true});
    } else {
        next();
    }
}
app.use(ignoreFavicon);

app.get('/', (req, res) => {
    if (yandex.isValid()) {
        res.sendFile('index.html');
    } else {
        yandex.init();
    }
});

app.post('/ads/get', (req, res) => {
    let words = req.body.query;
    // yandex.api.call();
    res.json([{
        name: words,
        contact: ''
    }]);
});

app.listen(port, () => {console.log(`app running on ${port}`);});