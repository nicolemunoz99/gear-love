const { dbQuery, insert, update, get } = require('../model');
const bcrypt = require('bcrypt');
const axios = require('axios');
const strava = require('../stravaAccess.js');
const urls = require('../../urls.js');
const saltSize = 12;

module.exports = {


    checkUsername: async (req, res) => {
      let userInDb = await get('users.auth', {username: req.query.username});
      if (userInDb.length === 0) { res.send('username available') }
      else { res.send(null) }
    },

    post: async(req, res) => {
      req.body.salt = await bcrypt.genSalt(saltSize);
      req.body.pw = await bcrypt.hash(req.body.pw, req.body.salt);
      await insert('users.auth', req.body);
      res.sendStatus(200);
    },

    stravaAuth: async (req, res) => {
      // recieve exchange token after user logs in on Strava
      
      stravaAccessQuery = `?client_id=${strava.clientId}` +
        `&client_secret=${strava.clientSecret}` +
        `&code=${req.query.code}` +
        `&grant_type=authorization_code`;

      // query strava to get REFRESH TOKEN and SHORT-LIVED ACCESS TOKEN
      let userTokens = (await axios.post(`https://www.strava.com/oauth/token${stravaAccessQuery}`)).data;
      console.log('userTokens', userTokens)
      
      let user_id = (await get('users.auth', {username: req.query.username}))[0].user_id;
      let stravaId = userTokens.athlete.id;
      userTokens.scope = req.query.scope;
      delete userTokens.token_type;
      delete userTokens.athlete;
      let authUpdate = {
        whereVar: { user_id },
        updateVars: userTokens
      };
      let updated = (await update('users.auth', authUpdate))[0];

      await insert('users.sessions', { user_id });
      await insert('users.info', { user_id, join_date: Date.now(), strava_id: stravaId});

      res.redirect(`${urls.client}`);
    },

    logout: async (req, res) => {
      console.log('attempting to delete session:', req.query)
      await update('users.sessions', {
        whereVar: req.query,
        updateVars: {session: null, expires_at: null}
      });
      console.log('success')
      res.sendStatus(204);
    }

}



