exports.up = async knex => {
	knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
	return await knex.schema.createTable('transaction', table => {
		table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
		table.uuid('renterId')
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
		table.enum('status', ['reject', 'pending', 'accept', 'noOffer', 'cancel', 'completed']).defaultTo('noOffer')
	})
}

exports.down = async knex => {
	await knex.schema.dropTableIfExists('transaction')
	knex.raw('drop extension if exists "uuid-ossp"')
}