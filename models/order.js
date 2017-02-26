'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = Schema({
    client: {
		type: Schema.Types.ObjectId,
        ref: 'Client'
	},
    dish: {
		type: Schema.Types.ObjectId,
        ref: 'Dish'
	},
    status: {
		type: String, 
		enum: ['Заказано', 'Готовится', 'Доставляется', 'Возникли сложности', 'Подано'],
		default: 'Заказано'
	},
	sum : {
		type: Number
	}
},{collection: 'orders'});

var Order = mongoose.model('orders', orderSchema);
module.exports = Order;