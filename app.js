const express = require("express");
const bodyParser = require("body-parser");
const api = require("netology-fake-drone-api"); 
const app = express();
//const mongoose = require('mongoose');
const client = require("./client"); 

const server = require('http').createServer(app);
const io = require('socket.io')(server);


app.set('port', process.env.PORT || '3000');
app.listen(app.get('port'), function () {
    console.log('Express started on port http://localhost:' + app.get('port'));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

app.use(express.static(__dirname + '/public'));

app.get('/', client.find);
/*
app.get('/', function(req, res){
    res.sendFile('./public/client.html', { root: __dirname });
});
*/
app.get('/kitchen', function(req, res){
    res.sendFile('public/kitchen.html', { root: __dirname });
});

app.use(function(req, res){
	res.status(404).send('404 Not Found');
});
app.use(function(err, req, res, next){
	console.dir(err);
	res.status(500).send('500 Server Error');
});
