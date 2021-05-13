const db = require('../config/knex');

module.exports = {
	findOne,
	create,
	update,
	remove
}

function findOne(id) {
	return db('user').where(id).select('*')
}

function create(input) {
	return db('user').insert(input).returning('*')
}

function update(input, id) {
	return db('user').where(id).update(input).returning('*')
}

async function remove(id) {
	const [identifier] = await db('user').where(id).del().returning('id')
	return `deleted ${identifier}`
}
