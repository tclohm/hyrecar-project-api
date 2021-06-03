exports.up = async knex => {
	knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
	return await knex.schema.createTable('car', table => {
		table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
		table.string('make').notNullable()
		table.string('model').notNullable()
		table.integer('year').notNullable()
		table.string('vin').notNullable()
		table.string('type').notNullable()
		table.boolean('available').defaultTo(true)
		table.decimal('ratePerDay').notNullable()
		table.integer('maxMilesPerDay').notNullable()
		table.boolean('airConditioning').defaultTo(false)
		table.boolean('automaticEmergencyBrakes').defaultTo(false)
		table.boolean('forwardCollisionWarning').defaultTo(false)
		table.boolean('blindSpotWarning').defaultTo(false)
		table.boolean('automaticHighBeams').defaultTo(false)
		table.boolean('carPlay').defaultTo(false)
		table.boolean('rearCamera').defaultTo(false)
		table.boolean('USBCharging').defaultTo(false)
		table.boolean('keylessEntry').defaultTo(false)
		table.boolean('headupDisplay').defaultTo(false)
		table.boolean('heatedSeats').defaultTo(false)
		table.boolean('wifiHotSpot').defaultTo(false)
		table.boolean('wirelessChargingPad').defaultTo(false)
		table.integer('carImageId')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('carImage')
			.onDelete('CASCADE')
			.onUpdate('CASCADE')
		table.uuid('profileId')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('profile')
			.onDelete('CASCADE')
			.onUpdate('CASCADE')
	})
}

exports.down = async knex => {
	await knex.schema.dropTableIfExists('car'); 
	knex.raw('drop extension if exists "uuid-ossp"');
}