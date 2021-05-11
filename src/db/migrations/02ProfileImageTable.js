exports.up = async knex => {
	knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
	return await knex.schema.createTable('profileImage', table => {
		table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
		table.string('filename').notNullable();
		table.string('mimetype').notNullable();
		table.string('encoding').notNullable();
		table.string('location').notNullable();
		table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
	});
};

exports.down = async knex => {
	await knex.schema.dropTableIfExists('profileImage');
	knex.raw('drop extension if exists "uuid-ossp"');
};