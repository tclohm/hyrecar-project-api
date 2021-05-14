const db = require('../config/knex')

module.exports = {
	find,
	findOne,
	create,
	update,
	remove
}

async function find(filter) {
	if (filter) {
		return db('carAndOwner').where(filter).select('*')
	}

	const carOwnerArr = await db('carAndOwner').join('car', 'car.id', 'carId').select('*')
	carOwnerArr.forEach(obj => {
		const { id, carId, rest } = obj
		return Object.assign({}, rest, { id: carId })
	})
	return carOwnerArr
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