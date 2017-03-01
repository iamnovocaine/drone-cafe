var express = require('express');
var router = express.Router();
var order = require("./orderActions");

module.exports = function(router, socket) {
	router
		.post("/server/orders", order.create(socket))
		.get("/server/orders", order.list)
		.delete("/server/orders/:id", order.deleteOne)
		.put("/server/orders/:id", order.update(socket))
		.put("/server/orders/:id/deliver", order.deliver(socket));
}