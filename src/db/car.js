const db = require('../config/knex')

module.exports = {
	insertImage,
	findImage,
	find,
	findOne
}

async function insertImage(input) {
	const [id] = await db('carImage').insert(input).returning('id')
	return findOneImage({ id })
}

async function findImage(id) {
	const image = await db('carImage').where(id).first('*')
	return { id: image.id, image }
}

function find(filter, id) {
	if (filter && id) { return db('car').where(filter, id).select('*') }
	if (filter) { return db('car').where(filter).select('*') }
	return db('car').select('*')
}

function findOne(filter) {
	return db('car').where(filter).first()
}