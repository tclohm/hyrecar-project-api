exports.up = async knex => {
	knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
	return await knex.schema.createTable('carRenter', table => {
		table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
		table.uuid('profileId')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('profile')
			.onDelete('CASCADE')
			.onUpdate('CASCADE')
		table.uuid('carId')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('car')
			.onDelete('CASCADE')
			.onUpdate('CASCADE')
		table.boolean('renting').defaultTo(false)
	})
}

exports.down = async knex => {
	await knex.schema.dropTableIfExists('carRenter'); 
	knex.raw('drop extension if exists "uuid-ossp"');