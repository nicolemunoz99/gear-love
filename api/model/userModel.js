const {dbQuery, update, insert} = require('./index.js')


module.exports =  {

  post: async (req, res) => {
    await insert('gear.users', req.body);
    res.sendStatus(200);
  },

  stravaAuth: async (info) => {
    ({ username, strava_id, access_token, expires_at, expires_in, refresh_token, scope } = {...info});
    let params = {
      name: 'strava-auth',
      text: `UPDATE gear.users SET strava_id = ${strava_id}, access_token = '${access_token}', scope = '${scope}', ` +
            `expires_at = ${expires_at}, expires_in = ${expires_in}, refresh_token = '${refresh_token}' ` +
            `WHERE username = '${username}'`
    }
    await dbQuery(params);
  },



  update: async (req, res) => {
    console.log('update', req.body.update)
    let result = await update('gear.users', req.body.update.whereVar, req.body.update.updateVars)
    console.log(result);
  },

  get: async (req, res) => {
    let params = {
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



