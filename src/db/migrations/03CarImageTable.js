exports.up = async knex => {
	knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
	return await knex.schema.createTable('carImage', table => {
		table.increments('id')
		table.string('name').notNullable()
		table.string('mimetype').notNullable()
		table.string('encoding').notNullable()
		table.string('location').notNullable()
		table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
	});
};

exports.down = async knex => {
	await knex.schema.dropTableIfExists('carImage')
	knex.raw('drop extension if exists "uuid-ossp"')
};