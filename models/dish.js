'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menuShema = new Schema({
	title: type: String,
	image: type: String,
	id: type: Number,
	rating: type: Number,
	ingredients: type: Array,
	price: type: Number
}, {collection: 'menu'});

var Menu = mongoose.model('menu', menuShema);

module.exports = Menu;