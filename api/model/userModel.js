const dbQuery = require('./index.js');

module.exports =  {
  post: async (info, callback) => {
    let params = {
      name: 'create-user',
      text: 'INSERT into gear.users (strava_id, token_type, access_token, expires_at, expires_in refresh_token ' +
            'VALUES($1, $2, $3, $4, $5, $6)',
      values: [info.strava_id, info.token_type, info.access_token, info.expires_at, info.expires_in, info.refresh_token]
    };
    let result = await dbQuery(params, callback);
  },

  put: () => {

  }
}




async (sessionInfo, callback) => {
  let params = {
    name: 'session',
    text: 'INSERT into sessions.users (session_id, access_token) VALUES($1, $2)',
    values: [sessionInfo.session_id, sessionInfo.access_token]
  };
  let result = await dbQuery(params, callback)
}

