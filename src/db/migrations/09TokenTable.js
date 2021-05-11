exports.up = knex => {
	return knex.schema.createTable('token', table => {
		table.increments();
		table.uuid('profileId')
			 .unsigned()
			 .notNullable()
			 .references('id')
			 .inTable('profile')
			 .onDelete('CASCADE')
			 .onUpdate('CASCADE');
		table.string('refreshToken', 800).notNullable();
		table.timestamp('expiresAt').notNullable();
	})
}

exports.down = async knex => {
	return knex.schema.dropTableIfExists('token'); 
}