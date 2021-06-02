const db = require('../config/knex')

module.exports = {
	insertImage,
	findImage,
	find,
	findOne,
	findByProfileId
}

async function insertImage(input) {
	const [id] = await db('carImage').insert(input).returning('id')
	return findOneImage({ id })
}

async function findImage(id) {
	const image = await db('carImage').where(id).first('*')
	return { id: image.id, image }
}

function find(type, year) {
	if(type === undefined && year === undefined) { return db('car').select('*') }
	if (type && year) { return db('car').where({ type: type }).where('year', '<=', year).select('*') }
	if (year) { return db('car').where('year', '<=', year).select('*') }
	if (type == "ALL") { return db('car').select('*') }
	if (type) { return db('car').where({ type: type }).select('*') }
}

function findByProfileId(id) {
	return db('car').where(id).select('*')
}

function findOne(filter) {
	return db('car').where(filter).first()
}