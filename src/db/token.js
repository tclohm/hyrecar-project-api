const db = require('../config/knex')

module.exports = {
	findOne,
	create,
	update
}

function findOne(filter) {
	return db('token').where(filter).first()
}

async function create(input) {
	const [id] = await db('token').insert(input).returning('id')
	return findOne({ id })
}

async function update(input, filter) {
	const [id] = await db('token').where(filter).update(input).returning('id')
	return findOne({ id })
}