const db = require('../config/knex')

module.exports = {
	find,
	findOne,
	create,
	update,
	remove
}

function find(filter) {
	if (filter) {
		return db('owner').where(filter).select('*')
	}
	return db('owner').select('*')
}

function findOne(id) {
	return db('owner').where(id).select('*')
}

function create(input) {
	return db('owner').insert(input).returning('*')
}

function update(input, id) {
	return db('owner').where(id).update(input).returning('*')
}

async function remove(id) {
	const [identifier] = await db('owner').where(id).del().returning('id')
	return `deleted ${identifier}`
}