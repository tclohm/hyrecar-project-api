const db = require('../config/knex');

module.exports = {
	findOne,
	create,
}

function findOne(filter) {
	return db('user').where(filter).first('*')
}

async function create(input) {
	const [id] = await db('user').insert(input).returning('id')
	return findOne({ id })
}