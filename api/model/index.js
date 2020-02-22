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

const dbQuery = async (params) => {
  return (await pool.query(params)).rows;
};

// table: string
// whereVar, updateVars: obj
// only accomodates one 'where' condition
const update = async (table, whereVar, updateVars) => { 
  let setStr = [];
  for (item in updateVars) {
    if (typeof updateVars[item] === 'string') {
      setStr.push(`${item} = '${updateVars[item]}'`);
    } else {
      setStr.push(`${item} = ${updateVars[item]}`);
    }
  }
  setStr = setStr.join(', ');
  let whereKey = Object.keys(whereVar)[0];
  let whereStr = typeof whereVar[whereKey] === 'string' ?  `${whereKey} = '${whereVar[whereKey]}'` : `${whereKey} = ${whereVar[whereKey]}`;

  let params = {text: `UPDATE ${table} SET ${setStr} WHERE ${whereStr}`};
}

const insert = async (table, keyValues) => {
  for (key in keyValues) {
    if (keyValues[key] === null || keyValues[key] === undefined || keyValues[key].length === 0)  {
      delete keyValues[key]
    }
  }

  let valuesStr = [];
  for (let i = 1; i <= Object.keys(keyValues).length; i++) valuesStr.push(`$${i}`);
  valuesStr = valuesStr.join(', ');

  params = {
    name: 'post-a-part',
    text: `INSERT INTO ${table} ` +
          `(${Object.keys(keyValues)}) ` + 
          `VALUES(${valuesStr}) RETURNING *`,
    values: [...Object.values(keyValues)]
  };
  let newEntry = await dbQuery(params);
  return newEntry;
}




module.exports = {dbQuery, insert}