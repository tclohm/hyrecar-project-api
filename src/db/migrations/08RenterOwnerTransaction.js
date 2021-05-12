exports.up = async knex => {
	knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
	return await knex.schema.createTable('renterOwnerTransaction', table => {
		table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
		table.uuid('profileId')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('profile')
			.onDelete('CASCADE')
			.onUpdate('CASCADE')
		table.uuid('carOwnerId')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('carOwner')
			.onDelete('CASCADE')
			.onUpdate('CASCADE')
		table.enum('rent', ['reject', 'pending', 'accept', 'noOffer']).defaultTo('noOffer')
	})
}

exports.down = async knex => {
	await knex.schema.dropTableIfExists('renterOwnerTransaction')
	knex.raw('drop extension if exists "uuid-ossp"')
}