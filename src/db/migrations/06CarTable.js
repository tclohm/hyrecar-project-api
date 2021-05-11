exports.up = async knex => {
	knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
	return await knex.schema.createTable('car', table => {
		table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
		table.string('make').notNullable()
		table.string('model').notNullable()
		table.string('year').notNullable()
		table.string('vin').notNullable()
		table.string('condition').notNullable()
		table.uuid('carImageId')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('carImage')
			.onDelete('CASCADE')
			.onUpdate('CASCADE')
	})
}

exports.down = async knex => {
	await knex.schema.dropTableIfExists('car'); 
	knex.raw('drop extension if exists "uuid-ossp"');
}