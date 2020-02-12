const dbAccess = require('../dbAccess.js')

const{ Pool, Client } = require('pg');
const pool = new Pool ({
  user: dbAccess.user,
  host: '127.0.0.1',
  // host: 'db',
  password: dbAccess.password,
  database: 'chainlove',
  port: '5432',
  max: 10
});

const dbQuery = async (params, callback) => {
  let data = await pool.query(params);
  callback(null, data.rows);
};

module.exports = dbQuery;