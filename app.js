const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);

const client = require("./server/client"); 
const order = require("./server/order");
const dish = require("./server/dish");

app.set('port', process.env.PORT || '3000');
app.listen(app.get('port'), function () {
    console.log('Express started on port http://localhost:' + app.get('port'));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

app.use(express.static(__dirname + '/public'));

app.use('/clients', client);
(app, io).use('/orders', order);
app.use('/dishes', dish);

/*app.all('/kitchen', function(req, res){
    res.redirect('/#!/Kitchen');
});
*/
app.use(function(req, res){
	res.status(404).send('404 Not Found');
});
app.use(function(err, req, res, next){
	console.dir(err);
	res.status(500).send('500 Server Error');
});
