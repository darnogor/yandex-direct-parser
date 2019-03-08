const router         = require('express').Router();
const path           = require('path');
const keys           = require('../config/keys');
const passport       = require('passport');
const YandexStrategy = require('passport-yandex').Strategy;


passport.serializeUser((user, done) => {
    done(null, user);
});


passport.deserializeUser((obj, done) => {
    done(null, obj);
});


passport.use(new YandexStrategy({
    clientID: keys.yandex.clientId,
    clientSecret: keys.yandex.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    let userData = {
        profile: profile,
        token: accessToken,
        refreshToken: refreshToken
    };
    done(null, userData);
}));


router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});


router.get('/yandex', passport.authenticate('yandex'));


router.get('/yandex/redirect', passport.authenticate('yandex', {
    failureRedirect: '/auth/login'
}), (req, res) => {
    res.redirect('/');
});


module.exports = router;