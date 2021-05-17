const db = require('../config/knex')

module.exports = {
	findOne,
	create,
	findByIdAndUpdate,
	findByIdAndDelete,
	saveRefreshToken
}

function findOne(filter) {
	return db('token').where(filter).first(); 
}
async function create(input) {
	const [id] = await db('token').insert(input).returning('id');
	return findOne({id});
}
async function findByIdAndUpdate(identifier, input) { 
	const [id] = await db('token').where(identifier).update(input).returning('id');
	return findOne({id});
}
async function findByIdAndDelete(id) { 
	const [identifier] = await db('token').where({ id }).del().returning('id'); 
	return `deleted ${identifier}`;
}

async function saveRefreshToken(profileId, refreshToken) {
	try {
		const token = await findByIdAndUpdate({id}, {refreshToken})
		if (!token) { throw new ApolloError("refresh vague answer"); }
		return token;
	} catch (err) {
		return err;
	}
}