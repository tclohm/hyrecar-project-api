const db = require('../config/knex');

module.exports = {
	findOne,
	create,
	update
}

function findOne(filter) {
	return db('user').where(filter).first('*')
}

async function create(input) {
	const [id] = await db('user').insert(input).returning('id')
	return findOne({ id })
}

async function update(input, identity) {
	const [id] = await db('user').where(identity).update(input).returning('id')
	return findOne({ id })
}

