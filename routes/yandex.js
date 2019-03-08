const router = require('express').Router();
const yandex = require('../api/yandex-direct-api');


router.post('/ads/get', async (req, res) => {
    let words = req.body.query;
    let token = req.user.token;
    if (token) {
        let api = yandex({token: token});
        try {
            let data = await api.call('ads', 'get', {

            });

            // res.json([{
            //     name: words,
            //     contact: ''
            // }]);
        } catch (e) {
            console.log(e);
        }
    }
});


module.exports = router;