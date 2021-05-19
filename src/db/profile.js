const db = require('../config/knex')

module.exports = {
	findOne,
	findImage,
	findUser,
	create,
	update,
	remove,
	Image: {
		insert
	}
}


async function findOne(id) {
	return db('profile').where(id).first('*')
}

async function findImage(id) {
	const image = await db('profileImage').where(id).first('*')
	return { id: image.id, image }
}

async function findUser(id) {
	const user = await db('profile')
		.join('user', 'user.id', 'profile.userId')
		.where(id)
		.first('*')
	return user
}

async function create(input) {
	const profiles = await db('profile').insert(input).returning('*')
	const profile = profiles[0]
	console.log(profile)
	return findOne({ id: profile.id })
}

function update(input, id) {
	return db('profile').where(id).update(input).returning('*')
}

async function remove(id) {
	const [identifier] = await db('profile').where(id).del().returning('id')
	return `deleted ${identifier}`
}

async function insert(input) {
	const [id] = await db('profileImage').insert(input).returning("id");
	return findImage({ id });
}
