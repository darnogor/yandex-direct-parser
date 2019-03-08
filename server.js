const express       = require('express');
const authRoutes    = require('./routes/auth');
const yandexRoutes  = require('./routes/yandex');
const keys          = require('./config/keys');
const passport      = require('passport');
const bodyParser    = require('body-parser');
const path          = require('path');
const cookieSession = require('cookie-session');
const port          = process.env.PORT || 5000;


let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/public', express.static(path.join(__dirname, 'views')));

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes);
app.use('/api', yandexRoutes);

const ensureAuth = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login');
    } else {
        next();
    }
};

app.get('/', ensureAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.listen(port, () => {console.log(`app running on ${port}`);});