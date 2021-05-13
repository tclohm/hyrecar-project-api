exports.up = async knex => {
	knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
	return await knex.schema.createTable('carAndOwner', table => {
		table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
		table.uuid('carId')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('car')
			.onDelete('CASCADE')
			.onUpdate('CASCADE')
		table.uuid('ownerId')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('owner')
			.onDelete('CASCADE')
			.onUpdate('CASCADE')
		table.boolean('available').defaultTo(true)
		table.decimal('ratePerDay').notNullable()
		table.integer('maxMilesPerDay').notNullable()
	})
}


exports.down = async knex => {
	await knex.schema.dropTableIfExists('carAndOwner'); 
	knex.raw('drop extension if exists "uuid-ossp"');
}