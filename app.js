const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const client = require("./server/client"); 
const order = require("./server/order");
const dish = require("./server/dish");

const url = 'mongodb://localhost:27017/drone-cafe';

app.set('port', process.env.PORT || '3000');

app.listen(app.get('port'), function () {
    console.log('Express started on port http://localhost:' + app.get('port'));
});

mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});

var menu = require("./menu");
var Dish = require("./models/dish");

Dish
	.find({})
	.exec()
    .then(function (findDishes) {
		if (!findDishes.length) {
			menu.reduce(function(previous, current) {
				let newDish = new Dish({
					"title": current.title,
					"image": current.image,
					"rating": current.rating,
					"ingredients": current.ingredients,
					"price": current.price
				});
				newDish.save(error => {
					if (error) 
						console.log(error);
				})
			}, 0);

		}
    })
	.catch(error => {
		if (error) 
			console.log(error);
	});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

app.use(express.static(__dirname + '/public'));

app.use('/server', client);
app.use('/server', order);
app.use('/server', dish);

app.use(function(req, res){
	res.status(404).send('404 Not Found');
});
app.use(function(err, req, res, next){
	console.dir(err);
	res.status(500).send('500 Server Error');
});