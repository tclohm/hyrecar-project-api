const db = require('../config/knex')

module.exports = {
	find,
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

function findOne(id) {
	return db('car').where(id).select('*')
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