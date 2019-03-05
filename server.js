let express = require('express');
let app = express();


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/view/index.html');
});

app.post('/ads/get', function (req, res) {
    let words = req.params.query;
});

app.use(express.static('view'));

app.listen(process.env.port || 5000, function () {
    console.log('app running');
});