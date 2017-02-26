var express = require('express');
var router = express.Router();
var client = require("./clientActions");

router
	.post("/clients", client.create)
	.get("/clients/:id", client.findOne)
	.put("/clients/:id", client.update);
module.exports = router;