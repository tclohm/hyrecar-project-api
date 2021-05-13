const db = require('../config/knex')

module.exports = {
	findOne,
	create,
	update,
	remove
}

function findOne(id) {
	return db('profile').where(id).select('*')
}

function create(input) {
	return db('profile').insert(input).returning('*')
}

function update(input, id) {
	return db('profile').where(id).update(input).returning('*')
}

async function remove(id) {
	const [identifier] = await db('profile').where(id).del().returning('id')
	return `deleted ${identifier}`
}
