exports.up = async knex => {
	knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
	return await knex.schema.createTable('profile', table => {
		table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
		table.uuid('userId')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('user')
			.onDelete('CASCADE')
			.onUpdate('CASCADE')
		table.integer('profileImageId')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('profileImage')
			.onDelete('CASCADE')
			.onUpdate('CASCADE')
		table.string('license', 20).notNullable()
		table.string('firstName').notNullable()
		table.string('lastName').notNullable()
		table.string('address').notNullable()
		table.string('secondaryAddress')
		table.string('state').notNullable()
		table.string('zipCode').notNullable()
		table.string('dob').notNullable()
		table.integer('rating').defaultTo(5)
		table.boolean('renting').defaultTo(false)
		table.json("app_metadata").defaultTo(JSON.stringify("{roles:['renter'], permissions:['create:own_content', 'edit:own_content', 'upload:own_media']}"))
	})
}

exports.down = async knex => {
	await knex.schema.dropTableIfExists('profile')
	knex.raw('drop extension if exists "uuid-ossp"')
}