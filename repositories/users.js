const db = require('../api/db-config.js');

module.exports = {
	find,
	findById,
	findByEmail,
	add,
	edit,
	remove
}

function find() {
	return db('users')
}

function findById(id) {
	return db('users').where('id', id).first()
}

function findByEmail(email) {
	return db('users').where('email', email).first()
}

function add(item) {
	return db('users').insert(item).returning('id');
}

function edit(id, item) {
	return db('users').update(item).where('id', id).returning('id');
}

function remove(id) {
	return db('users').del().where('id', id)
}
