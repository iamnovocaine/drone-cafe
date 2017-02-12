'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = Schema({
    clientId: String,
    dishId: Number,
    status: {
		type: String, 
		enum: ['Заказано', 'Готовится', 'Доставляется', 'Возникли сложности', 'Подано'],
		default: 'Заказано'
	},
    time: Date
},{collection: 'orders'});

var Order = mongoose.model('orders', orderSchema);
module.exports = Order;