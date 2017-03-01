const Order = require("../models/order");
const Client = require("./clientActions");
const mydrone = require("netology-fake-drone-api");

function create(socket) {
	return function (req, res) {
		let newOrder = new Order({
			"client": req.body.client,
			"dish": req.body.dish,
		});
		newOrder
			.save()
			.then(function (newOrder) {
				return Order.populate(newOrder, 'dish');
			})
			.then(function (newOrder) {
				return Client.buy(newOrder.client, -newOrder.dish.price);
			})
			.then(function(client) {
				newOrder.client = client;
				//console.log(socket);
				//socket.kitchen.emit("newOrder", newOrder);
				res.json(newOrder);
			})
			.catch(error => res.status(500).send({error: error.message}));
	}
}
function list(req, res) {
	let query = req.query ? req.query : {};
	Order.find(query).populate('dish').exec()
        .then(function (findOrder) {
            if (!findOrder) {
                return res.send({
                    error: 'Order not found'
                });
            } else {
                res.json(findOrder);
            }
        })
        .catch(error => res.status(500).send({error: error.message}));
}
function deleteOne(req, res) {
	let id = req.params.id;
	Order
		.remove({ _id: id }).exec()
        .then(function (findOrder) {
            if (!findOrder) {
                return res.send({
                    error: 'Order not found'
                });
            } else {
                res.json();
            }
        })
        .catch(error => res.status(500).send({error: error.message}));
}

function update(socket) {
	return function (req, res) {
		let id = req.params.id;
		let orderStatus = req.body.status;
		let query = {status: orderStatus};
		/*let Finished = false;
        if (orderStatus == "Подано" || orderStatus == "Возникли сложности") {
            Finished = true;
        }
		*/		
		Order
			.findOneAndUpdate({"_id": id}, {$set: query}).populate('dish').exec()
			.then(function (findOrder) {
				if (!findOrder) {
					return res.send({
						error: 'Order not found'
					});
				} else {
					//socket.client.to(findOrder.user).emit("ChangeOfStatus", findOrder);
					res.json(findOrder);
				}
			})
			.catch(error => res.status(500).send({error: error.message}));
	}
}
function deliver(socket) {
	return function (req, res) {
		let id = req.params.id;
		Order
			.findById(id).populate('dish').populate('client').exec()
			.then(function (findOrder) {
				mydrone.deliver(findOrder.client, findOrder.dish)
						.then(function () {
							req.body.status = "Подано";
							update(socket)(req, res);
						})
						.catch(function () {
							Client.buy(order.client._id, order.sum)
								.then(function (client) {
									socket.client.to(client._id).emit("ChangeOfBalance", client.balance);
									req.body.status = "Возникли сложности";
									update(socket)(req, res);
								});
						});
			})
			.catch(error => res.status(500).send({error: error.message}));
	}
}

module.exports = {
    create,
	list,
	deleteOne,
	update,
	deliver
};