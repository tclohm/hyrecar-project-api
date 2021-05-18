exports.up = async knex => {
	knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
	return await knex.schema.createTable('profileImage', table => {
		table.increments('id')
		table.string('name').notNullable().defaultTo('anon-0.jpg')
		table.string('mimetype').notNullable().defaultTo('image/jpg')
		table.string('encoding').notNullable().defaultTo('7bit')
		table.string('location').notNullable().defaultTo('/static/assets/images/placeholder/anon-0.jpg')
		table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
	});
};

exports.down = async knex => {
	await knex.schema.dropTableIfExists('profileImage')
	knex.raw('drop extension if exists "uuid-ossp"')
};