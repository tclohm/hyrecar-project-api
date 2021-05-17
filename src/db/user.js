const db = require('../config/knex');

module.exports = {
	findProfile,
	findOne,
	create,
	update,
	remove
}

function findProfile(id) {
	return db('user').join('profile', 'user.id', 'profile.userId').where('profile.userId', '=', id.userId).first('*')
}

function findOne(filter) {
	return db('user').where(filter).select('*')
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
