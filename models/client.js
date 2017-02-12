'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientSchema = Schema({
    email: String,
    name: String,
    balance: Number,
	cook: Boolean,
},{collection: 'clients'});

var Client = mongoose.model('clients', userSchema);

module.exports = Client;