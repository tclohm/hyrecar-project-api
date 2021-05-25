const db = require('../config/knex')

module.exports = {
	find
}


function find(id) {
	return db('carRating')
		.join('rating', 'rating.id', 'ratingId')
		.where(id)
		.select('*')
}