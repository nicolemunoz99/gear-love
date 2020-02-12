const dbQuery = require('./index.js');

module.exports =  async (sessionInfo, callback) => {
  let params = {
    name: 'session',
    text: 'INSERT into sessions.users (session_id, access_token) VALUES($1, $2)',
    values: [sessionInfo.session_id, sessionInfo.access_token]
  };
  let result = await dbQuery(params, callback)
}

