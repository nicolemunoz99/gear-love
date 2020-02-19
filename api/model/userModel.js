const dbQuery = require('./index.js');


module.exports =  {
  post: async (info, callback) => {
    let params = {
      name: 'create-user',
      text: 'INSERT into gear.users (username, pw) ' +
            'VALUES($1, $2)',
      values: [info.username, info.pw]
    };
    let result = await dbQuery(params, callback);
  },
// strava_id, access_token, expires_at, expires_in, refresh_token
  stravaAuth: async(info, callback) => {
    console.log('info in userModel', info);
    ({username, strava_id, access_token, expires_at, expires_in, refresh_token, scope} = {...info});
    let params = {
      name: 'strava-auth',
      text: `UPDATE gear.users SET strava_id = ${strava_id}, access_token = '${access_token}', scope = '${scope}', ` +
            `expires_at = ${expires_at}, expires_in = ${expires_in}, refresh_token = '${refresh_token}' ` +
            `WHERE username = '${username}'`
    }
    console.log('params', params)
    let result = await dbQuery(params, callback);
  },
  
  // put: async () => {
  //   let params 
  // },

  verify: async (username, callback) => {
    let params = {
      name: 'check-username-exists',
      text: `SELECT * FROM gear.users WHERE username = '${username}'`
    };
    let result = await dbQuery(params, callback);
  }
}



