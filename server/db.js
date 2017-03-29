const knex = require('knex')({
  client: 'pg',
  connection: 'postgres://Toby@localhost/willapp'
})

module.exports = knex;
