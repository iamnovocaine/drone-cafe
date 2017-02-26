const Dish = require("../models/dish");

function list(req, res) {
	let query = req.query ? req.query : {};
	Dish.find(query).exec()
        .then(function (findDishes) {
            if (!findDishes) {
                return res.send({
                    error: 'Dishes not founded'
                });
            } else {
                res.json(findDishes);
            }
        })
        .catch(error => res.status(500).send({error: error.message}));
}
module.exports = {
    list
};