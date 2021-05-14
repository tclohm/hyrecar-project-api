const db = require('../config/knex')

module.exports = {
	find,
	findImage,
	findOne,
	create,
	update,
	remove
}

/* 
	cars: [
		{
			id
			model
			owner: {
				id
				cars: {}
				profile: {
					id
					avatar: {
						id
						image: {
							location
						}
					}
				}
				
			}
	]
*/

async function find(filter) {
	if (filter) {
		return db('car').where(filter)
	}
	return db('car').select('*')
}

async function findImage(id) {
	const image = await db('carImage').where(id).first('*')
	return { id: image.id, image }
}

// MARK: -- car with carAndOwner
async function findOne(id) {
	const car = await db('car')
	.join('carAndOwner as cao', 'cao.carId', 'car.id')
	.where('car.id', id.id).first('*')
	return car
}

function create(input) {
	return db('car').insert(input).returning('*')
}

function update(input, id) {
	return db('car').where(id).update(input).returning('*')
}

async function remove(id) {
	const [identifier] = await db('car').where(id).del().returning('id')
	return `deleted ${identifier}`
}