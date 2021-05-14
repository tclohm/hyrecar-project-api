const db = require('../config/knex')

module.exports = {
	findRenter,
	findOne,
	create,
	update,
	remove
}

function findRenter(id) {
	return db('transaction')
	.join('profile', 'profile.id', 'renterId')
	.where(id)
	.select('*')
}

function findOwner(id) {
	return db('transaction')
	.join('profile', 'profile.id', 'ownerId')
	.where(id)
	.select('*')
}

async function findOne(id) {
	return db('carAndOwner')
		.join('profile', 'profile.id', 'profileId')
		.where(id)
		.first('*')
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