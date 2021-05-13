const db = require('../config/knex')

module.exports = {
	find,
	findOne,
	create,
	update,
	remove
}

async function find(filter, query) {
	if (filter) {
		return db('car').where(filter)
	}

	const owner = await db('owner').select("*").where({ carId: id })


	
}

function findOne(id) {
	return db('car').where(id).select('*')
}

function create(input) {
	return db('car').insert(input).returning('*')
}

function update(input, id) {
	return db('car').where(id).update(input).returning('*')
}

async function remove(id) {
	const [identifier] = await db('car').where(id).del().returning('id')
	return `deleted ${identifier}`
}