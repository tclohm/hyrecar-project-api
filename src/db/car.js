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

function find(type, year, id) {
	if (type && year) { return db('car').where(type).where('year', '>=', year).select('*') }
	if (type) { return db('car').where(type).select('*') }
	if (year) { return db('car').where('year', '>=', year).select('*') }
	return db('car').select('*')
}

function findOne(filter) {
	return db('car').where(filter).first()
}