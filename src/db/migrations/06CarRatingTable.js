exports.up = async knex => {
	knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
	return await knex.schema.createTable('carRating', table => {
		table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
		table.uuid('carId')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('car')
			.onDelete('CASCADE')
			.onUpdate('CASCADE')
		table.integer('ratingId')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('rating')
			.onDelete('CASCADE')
			.onUpdate('CASCADE')
	})
}

exports.down = async knex => {
	await knex.schema.dropTableIfExists('carRating'); 
	knex.raw('drop extension if exists "uuid-ossp"');
}