const clients = require('./clients'); //data
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/clients';
let database;

MongoClient.connect(url, (err, db) => {
	if (err) {
	console.log('Ошибка подключения ', err);
	} else {
		database = db;
		const collection = db.collection('clients');
		collection.insert(clients, (err, result) => {
			if (err) {
				console.log(err);
			}
		});
	}
});
function find(req, res) {
	let id = req.params.id;
    let search = req.query ? req.query : {};
    if (id)
        search["_id"] = new mongodb.ObjectID(id);
	
	database.collection('clients').find(search).toArray((err, result) => {
		if (err) {
		console.log(err);
		} else {
		res.json({clients: result});
		};
	});
}
function create(req, res) {
	let newClient = [{
        "name": req.body.name,
        "email": req.body.email,
		"balance": 100,
    }];
	database.collection('clients').insert(newClient);
	
}
module.exports = {
    create,
	find
};