// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'hyrecar',
      user:     'postgres',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/src/db/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: __dirname + '/src/db/seeds'
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      database: 'hyrecar',
      user:     'postgres',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/src/db/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: __dirname + '/src/db/seeds'
    }
  }
};
