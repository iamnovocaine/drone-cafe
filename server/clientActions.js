const Client = require("../models/client");
function create(req, res) {
	let newClient = new Client({
        "name": req.body.name,
        "email": req.body.email,
		"balance": 100,
    });
	newClient
		.save()
		.then(function () {
            res.json(newClient);
        })
        .catch(error => res.status(500).send({error: error.message}));
}

function findOne(req, res) {
	let email = req.params.id ? req.params.id : '';
	Client
		.findOne({email: email}).exec()
        .then(function (findClient) {
            if (!findClient) {
                return res.json({"error": "Client not found"});
            } else {
                res.json(findClient);
            }
        })
        .catch(error => res.status(500).send({error: error.message}));
}
function buy(id, sum) {
	return Client
		.findOneAndUpdate({"_id": id}, {$inc: {"balance": sum}}).exec()
}
function update(req, res) {
	let id = req.params.id;
	let sum = req.query.sum ? req.query.sum : +100;
	Client
		.findOneAndUpdate({"_id": id}, {$inc: {"balance": sum}}).exec()
		.then(function (findClient) {
            if (!findClient) {
                return res.send({
                    error: 'Client not founded'
                });
            } else {
                res.json(findClient);
            }
        })
        .catch(error => res.status(500).send({error: error.message}));
}

module.exports = {
    create,
	findOne, 
	update
};