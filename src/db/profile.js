const db = require('../config/knex')

module.exports = {
	insertImage,
	findImage,
	findOne,
	create,
	update
}

// MARK: Queries
async function insertImage(input) {
	const [id] = await db('profileImage').insert(input).returning('id')
	return findImage({ id })
}

async function findImage(id) {
	const image = await db('profileImage').where(id).first('*')
	return { id: image.id, image }
}

function findOne(filter) {
	return db('profile').where(filter).first('*')
}

// MARK: Mutations
async function create(input) {
	const [id] = await db('profile').insert(input).returning('id')
	return findOne({ id })
}

async function update(input, identity) {
	const [id] = await db('profile').where(identity).update(input).returning('id')
	return findOne({ id })
}