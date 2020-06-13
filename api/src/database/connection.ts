import knex from 'knex';

const connection = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5434,
    user: 'docker',
    password: 'docker',
    database: 'ecoleta',
  },
});

export default connection;
