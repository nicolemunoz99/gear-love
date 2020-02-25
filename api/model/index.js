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
// conditions: object of key/values to match
const get = async (table, conditions) => {
  let whereStr = [];
  for (key in conditions) {
    whereStr = typeof conditions[key] === 'string' ?
    [...whereStr, `${key} = '${conditions[key]}'`] : [...whereStr, `${key} = ${conditions[key]}`];
  }
  whereStr = whereStr.join(' AND ');
  
  let params = {
    text: `SELECT * from ${table} WHERE ${whereStr}`
  };
  
  return await dbQuery(params);
}

// table: string
// data: object with keys 'whereVar', 'updatVars'
  // whereVar: object of condition to match (single condition)
  // updateVars: key/values to update
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


// table: string
// keyValues: object of key/values to insert
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


// table: string
// cols: array of columns (as strings) to delete
// conditions: object of key/values to match
const deleteCols = async (table, conditions) => {
  let whereStr = [];
  let colsStr = [];
  for (key in conditions) {
    if (typeof conditions[key] === 'string') {
      whereStr.push(`${key} = '${conditions[key]}'`);
    } else {
      whereStr.push(`${key} = ${conditions[key]}`);
    }
    
  }

  whereStr = whereStr.join(` AND `)
  let params = {text: `DELETE from ${table} ${colsStr} WHERE ${whereStr}`}
  console.log('params', params)
  return await dbQuery(params);
};




module.exports = {dbQuery, insert, update, get}