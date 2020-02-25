const { dbQuery, insert, update, get } = require('../model/index.js');
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
      await insert('users.info', { user_id, strava_id: userTokens.athlete.id });
      userTokens.scope = req.query.scope;
      delete userTokens.token_type;
      delete userTokens.athlete;
      let authUpdate = {
        whereVar: { user_id },
        updateVars: userTokens
      };
      let updated = (await update('users.auth', authUpdate))[0];

      await insert('users.sessions', {user_id: updated.user_id})

      res.redirect(`${urls.client}`);
    },

    login: async (req, res) => {
      
      let userAuth;
      let session;

      // via username/pw
      if (req.query.username) {
        userAuth = (await get('users.auth', {username: req.query.username}))[0];
        if (!userAuth) {
          res.send(null);
          return;
        }
        
        let pwSalt = userAuth.salt;
        let pwAttempt = await bcrypt.hash(req.query.pw, pwSalt);

        // username/pw don't match
        if (userAuth.pw !== pwAttempt) { 
          res.send(null);
          return; 
        };
        session = await bcrypt.genSalt(saltSize);
        
        await update('users.sessions', {
          whereVar: {user_id: userAuth.user_id}, 
          updateVars: {session: session, expires_at: Date.now() }
        });
      }

      // authenticate via session
      if (req.query.session) { 
        console.log('user has session', req.query.session)
        let params = {text:
          `SELECT * FROM users.auth WHERE user_id=(SELECT user_id FROM users.sessions WHERE session='${req.query.session}')`
        }
        // check if session expired
        userAuth = (await dbQuery(params))[0];
        console.log(userAuth);
        
        if (!userAuth) { 
          res.sendStatus(209); // session doesn't exist
          return;
        }

      }


      let token = userAuth.access_token;
      console.log('scope', userAuth.scope)
      if (userAuth.scope != 'read,activity:read_all,profile:read_all') {
        console.log('incorrect scope');
        res.sendStatus(227); // no auth token or incorrect scope
        return;
      }

      // refresh token when expires within 30 minutes
      if (userAuth.expires_at - Date.now() / 1000 < 60 * 30) {
        console.log('expired token. contacting strava for new...')
        let refreshedTokens = await refreshToken(userAuth.refresh_token); // new tokens from strava
        delete refreshedTokens.token_type;
        let dataToUpdate = {
          whereVar: {user_id: userAuth.user_id},
          updateVars: refreshedTokens
        }
        
        await update('users.auth', dataToUpdate); // update with refreshed tokens
        token = refreshedTokens.access_token;
      }
      //////////////////

      // EVERY LOGIN

      // get athlete data
      console.log('contacting strava')
      let athleteData = (await axios.get(`${urls.stravaApi}/athlete`, {
        headers: { Authorization: `Bearer ${token}` }
      })).data;

      // get latest activity
      let lastRide = await getLastRide(token);
      
      // update measurement pref, latest activity, session
      let newAthleteData =  {
        measurement_preference: athleteData.measurement_preference,
        last_ride_id: lastRide.id,
        last_ride_name: lastRide.name,
      };

      console.log('data', newAthleteData);
     
      let updatedAthlete = (await update('users.info', {
        whereVar: {user_id: userAuth.user_id}, 
        updateVars: newAthleteData
      }))[0];
      updatedAthlete.session = session;
      console.log('updatedAthlete', updatedAthlete)
      
      let bikesInDb = await get('gear.bikes', {strava_id: updatedAthlete.strava_id});    



      // FIRST LOGiN (TO DO: generalize to add new bikes)
      if (bikesInDb.length === 0 && athleteData.bikes.length > 0) { 
        console.log('first login');

        await getTotTimesAndDetails(athleteData.bikes, token);
        addBikePromises = [];
        for (bike of athleteData.bikes) {
          bike.strava_id = athleteData.id;
          let bikePromise = async () => {
            
            bike.time_on_add = bike.time_current;
            bike.dist_on_add = bike.dist_current;
            return await insert('gear.bikes', bike);
          }
          addBikePromises.push(bikePromise());
        }
        let postedBikes = await Promise.all(addBikePromises);
        console.log('postedBikes: ', postedBikes)
        updatedAthlete.bikes = postedBikes;
        res.send(updatedAthlete);
        return;
      }


      // REPEAT LOGIN
      if (bikesInDb) {
        console.log('user has bikes in Db');
        updatedAthlete.bikes = bikesInDb
        // TODO: check if any new bikes in athleteData and add to DB

        // TODO: update distance_current and time_current since last logged activity
        
        // sendData;
        res.send(updatedAthlete);
        return;
      }


      if (!bikesInDb && athleteData.bikes.length === 0) {
        // prompt user to add bikes via Strava
      }


    }

}


/////////////////////////
// helper funcs
/////////////////////////


const refreshToken = async (refreshToken) => {

  let stravaRefreshQuery = `?client_id=${strava.clientId}` +
    `&client_secret=${strava.clientSecret}` +
    `&refresh_token=${refreshToken}` +
    `&grant_type=refresh_token`;

  let response = await axios.post(`https://www.strava.com/oauth/token${stravaRefreshQuery}`)
  console.log('contacted Strava. Refreshed tokens:', response.data);
  return response.data;
};

const getLastRide = async (token) => {
  let page = 1;
  let lastRide;
  while (true) {
    console.log('contacting strava...')
    let activities = (await axios.get(`${urls.stravaApi}/athlete/activities?page=${page}`, {
      headers: { Authorization: `Bearer ${token}` }
    })).data;

    for (activity of activities) {
      if (activity.type === 'Ride') {
        lastRide = activity;
        break;
      };
    }
    if (activities.length === 0) break;
    if (lastRide) break;
    page++;
  }
  return lastRide;
};


const getTotTimesAndDetails = async (bikes, token) => {
  let bikeIds = [];
  bikes.forEach(bike => { 
    bikeIds.push(bike.id);
    bike.time_current = 0;
  });

  // bike details
  for (bike of bikes) {
    console.log('contacting strava...')
    let details = (await axios.get(`${urls.stravaApi}/gear/${bike.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })).data;

    bike.brand_name = details.brand_name;
    bike.model_name = details.model_name;
    bike.frame_type = details.frame_type;
    bike.description = details.description;
    bike.bike_id = bike.id;
    bike.dist_current = bike.distance;
    delete bike.id;
    delete bike.resource_state;
    delete bike.distance;
    delete bike.primary;
  }

  console.log('contacting strava...')
  // calc total times for each bike
  page = 1;
  while (true) {
    let activities = (await axios.get(`${urls.stravaApi}/athlete/activities?page=${page}`, {
      headers: { Authorization: `Bearer ${token}` }
    })).data;

    if (activities.length === 0) break;

    for (activity of activities) {
      if ( activity.type === 'Ride' && activity.gear_id && bikeIds.includes(activity.gear_id) ) {
        
        bikes.forEach(bike => {
          if (bike.bike_id === activity.gear_id) {
            bike.time_current = bike.time_current + activity.moving_time;
          }
        });

      }
    }
    page++;
  }
  return bikes;
}
