const dbQuery = require('./index.js');


module.exports =  {
  post: async (req, res) => {
    let params = {
      name: 'create-user',
      text: 'INSERT into gear.users (username, pw) ' +
            'VALUES($1, $2)',
      values: [req.body.username, req.body.pw]
    };
    await dbQuery(params);
    res.sendStatus(200);
  },
// strava_id, access_token, expires_at, expires_in, refresh_token
  stravaAuth: (info, callback) => {
    ({ username, strava_id, access_token, expires_at, expires_in, refresh_token, scope } = {...info});
    let params = {
      name: 'strava-auth',
      text: `UPDATE gear.users SET strava_id = ${strava_id}, access_token = '${access_token}', scope = '${scope}', ` +
            `expires_at = ${expires_at}, expires_in = ${expires_in}, refresh_token = '${refresh_token}' ` +
            `WHERE username = '${username}'`
    }
    let result = dbQuery(params, callback);
  },

  stravaRefresh: async (refreshedData) => {
    ({ username, access_token, expires_at, expires_in, refresh_token, scope } = {...refreshedData});
    let params = {
      name: 'strava-refresh',
      text: `UPDATE gear.users SET access_token = '${access_token}', expires_at = ${expires_at}, ` +
            `expires_in = ${expires_in}, refresh_token = '${refresh_token}' ` +
            `WHERE username = '${username}'`
    }
    await dbQuery(params);
  },


  updatePref: async (prefInfo) => {
    ({ strava_id, measurement_preference } = {...prefInfo});
    let params = {
      name: 'updatePref',
      text: `UPDATE gear.users SET measurement_preference = '${measurement_preference}' WHERE strava_id = ${strava_id}`
    }
    await dbQuery(params);
  },

  get: async (req, res) => {
    let params = {
      name: 'get-user-data',
      text: `SELECT * FROM gear.users WHERE username = '${req.query.username}'`
    };

    let userData = (await dbQuery(params))[0];
    
    if (req.query.check) { // check if username avail
      if (userData) {
        res.send(null);
      } else {
        res.send('available')
      }
    }

    if (req.query.getData) { // get user data
      return userData;
    }
    

  }
}



