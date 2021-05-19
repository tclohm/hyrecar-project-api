const db = require('../config/knex')

module.exports = {
	find,
	findImage,
	findOne,
	create,
	update,
	remove,
	Image: {
		insert
	}
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
	console.log("find image")
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

async function create(input) {
	console.log("CREATED")
	const cars = await db('car').insert(input).returning('*')
	const car = cars[0]
	console.log(car)
	return car 
}

function update(input, id) {
	return db('car').where(id).update(input).returning('*')
}

async function remove(id) {
	const [identifier] = await db('car').where('id', id).del().returning('id')
	return `deleted ${identifier}`
}

async function insert(input) {
	console.log("insert image")
	const [id] = await db('carImage').insert(input).returning("id");
	console.log("image id", id)
	return findImage({ id });
}