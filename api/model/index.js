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


const get = async (table, criteria) => {
  let whereStr = [];
  for (key in criteria) {
    whereStr = typeof criteria[key] === 'string' ?
    [...whereStr, `${key} = '${criteria[key]}'`] : [...whereStr, `${key} = ${criteria[key]}`];
  }
  whereStr = whereStr.join(' AND ');
  
  let params = {
    text: `SELECT * from ${table} WHERE ${whereStr}`
  };
  
  return await dbQuery(params);
}

const update = async (table, data) => { 
  console.log(table, data);
  let { whereVar, updateVars } = data;
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
  let params = {text: `UPDATE ${table} SET ${setStr} WHERE ${whereStr} RETURNING *`};
  console.log('params', params)
  let updatedEntry = await dbQuery(params);
  return updatedEntry;
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
    text: `INSERT INTO ${table} ` +
          `(${Object.keys(keyValues)}) ` + 
          `VALUES(${valuesStr}) RETURNING *`,
    values: [...Object.values(keyValues)]
  };
  console.log(params);
  let newEntry = await dbQuery(params);
  return newEntry;
};




module.exports = {dbQuery, insert, update, get}