var express = require('express');
var router = express.Router();
var order = require("./orderActions");

router
	.post("/orders/:id", order.create)
	.get("/orders", order.list)
	.delete("/orders/:id", order.deleteOne)
	.put("/orders/:id", order.update)
	.put("/orders/:id/deliver", order.deliver);

module.exports = router;