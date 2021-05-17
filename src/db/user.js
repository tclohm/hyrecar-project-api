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

async function findOne(filter) {
	const user = await db('user').where(filter).first('*')
	return user
}

async function create(input) {
	const [user] = await db('user').insert(input).returning('*')
	return findOne({ id: user.id })
}

function update(input, id) {
	return db('user').where(id).update(input).returning('*')
}

async function remove(id) {
	const [identifier] = await db('user').where(id).del().returning('id')
	return `deleted ${identifier}`
}
