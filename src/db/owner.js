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
		return db('carAndOwner').where(filter).select('*')
	}
	return db('carAndOwner').select('*')
}

function findOne(id) {
	return db('carAndOwner').where(id).select('*')
}

function create(input) {
	return db('carAndOwner').insert(input).returning('*')
}

function update(input, id) {
	return db('carAndOwner').where(id).update(input).returning('*')
}

async function remove(id) {
	const [identifier] = await db('carAndOwner').where(id).del().returning('id')
	return `deleted ${identifier}`
}