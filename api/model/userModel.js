const dbQuery = require('./index.js');

module.exports =  {
  post: async (info, callback) => {
    let params = {
      name: 'create-user',
      text: 'INSERT into gear.users (strava_id, access_token, expires_at, expires_in, refresh_token) ' +
            'VALUES($1, $2, $3, $4, $5)',
      values: [info.strava_id, info.access_token, info.expires_at, info.expires_in, info.refresh_token]
    };
    let result = await dbQuery(params, callback);
  },

  put: () => {

  }
}



