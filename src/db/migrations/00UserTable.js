exports.up = async knex => {
	knex.raw('CREATE EXTENSION IF NOT EXIST "uuid-ossp"')
	return await knex.schema.createTable('user', table => {
		table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
		table.string('email').notNullable().unique()
		table.string('password').notNullable()
		table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
	})
}

exports.down = async knex => {
	await knex.schema.dropTableIfExists('user')
	knex.raw('drop extension if exists "uuid"')
}