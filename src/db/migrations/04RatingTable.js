exports.up = async knex => {
	return await knex.schema.createTable('rating', table => {
		table.increments('id')
		table.float('interiors').notNullable()
		table.float('exteriors').notNullable()
		table.float('steering').notNullable()
		table.float('braking').notNullable()
		table.float('acceleration').notNullable()
		table.float('cleaniness').notNullable()
		table.string('review', 1000).notNullable()
		table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
	})
}

exports.down = async knex => {
	await knex.schema.dropTableIfExists('rating'); 
}