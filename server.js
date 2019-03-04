var express = require('express');
var app = express();


app.get('/', function (req, res) {
    res.render('index.html');
});


var port = process.env.port || 8080;

app.use(express.static(__dirname));
app.use(express.static(__dirname + 'view'));

app.listen(port, function () {
    console.log('app running');
});