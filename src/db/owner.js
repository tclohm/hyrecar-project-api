const db = require('../config/knex')

module.exports = {
	find,
	findOne,
	findCar,
	create,
	update,
	remove
}

async function find(filter) {
	if (filter) {
		const ownerArray = await db('carAndOwner').join('car', 'car.id', 'carId').where(filter).select('*')
		ownerArray.forEach(obj => {
			const { id, carId, rest } = obj
			const ownerCars = Object.assign({}, rest, { id: carId })
			return ownerCars
		})
		return ownerArray
	}

	const carOwnerArr = await db('carAndOwner').join('car', 'car.id', 'carId').select('*')
	carOwnerArr.forEach(obj => {
		const { id, carId, rest } = obj
		return Object.assign({}, rest, { id: carId })
	})
	
	return carOwnerArr
}




async function findOne(id) {
	const carOwner = await db('carAndOwner')
		.join('profile', 'profile.id', 'profileId')
		.where(id)
		.first('*')
		console.log("find one", carOwner)
	return carOwner
}


async function findCar(id) {
	const car = await db('carAndOwner')
		.join('car', 'car.id', 'carId')
		.where(id)
		.first()
	return car
}

async function create(input) {
	const owners = await db('carAndOwner').insert(input).returning('*')
	const owner = owners[0]
	const { profileId } = owner
	
	return findCar({profileId})
}

function update(input, id) {
	return db('carAndOwner').where(id).update(input).returning('*')
}

async function remove(id) {
	await db('carAndOwner').where('carId', id).del()
	return 'deleted'
}