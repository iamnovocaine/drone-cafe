'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dishShema = new Schema({
	title: String,
	image: String,
	rating:  Number,
	ingredients: Array,
	price: Number
}, {collection: 'dish'});

var Dish = mongoose.model('dish', dishShema);

module.exports = Dish;