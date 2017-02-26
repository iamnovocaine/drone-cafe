var express = require('express');
var router = express.Router();
var dish = require("./dishActions");

router.get("/dishes", dish.list);

module.exports = router;