const bikeModel = require('../model/bikeModel.js');
const partModel = require('../model/partModel.js');
const userModel = require('../model/userModel.js');
const axios = require('axios');
const strava = require('../stravaAccess.js');
const urls = require('../../urls.js');

const athleteData = require('../athleteData.js');

module.exports = {


  users: {

    signup: async (req, res) => {
      // recieve exchange token after user logs in on Strava

      stravaAccessQuery = `?client_id=${strava.clientId}` +
        `&client_secret=${strava.clientSecret}` +
        `&code=${req.query.code}` +
        `&grant_type=authorization_code`;

      // query strava to get REFRESH TOKEN and SHORT-LIVED ACCESS TOKEN
      let userTokens = (await axios.post(`https://www.strava.com/oauth/token${stravaAccessQuery}`)).data;

      userTokens.scope = req.query.scope;
      userTokens.strava_id = userTokens.athlete.id;
      userTokens.username = req.query.username;
      delete userTokens.athlete
      await userModel.stravaAuth(userTokens);
      res.redirect(`${urls.client}`);
    },
    // TO DO: VERIFY scope access

    login: async (req, res) => {
      
      req.query.getData = true;
      let userInfo = await userModel.get(req, null);

      if (userInfo && userInfo.pw !== req.query.pw) { // username/pw doesn't exist
        res.sendStatus(204);
        return; 
      }; 

      let token = userInfo.access_token;

      // if auth token expires within 30 minutes
      if (userInfo.expires_at - Date.now() / 1000 < 60 * 30) {
        console.log('expired token. Getting new...')
        let refreshedData = await refreshToken(userInfo.refresh_token); // new token from strava
        refreshedData.username = userInfo.username;
        await userModel.stravaRefresh(refreshedData); // update users table

        token = refreshedData.access_token;
      }

      // // get athlete data
      // let athleteData = (await axios.get(`${urls.stravaApi}/athlete`, {
      //   headers: { Authorization: `Bearer ${token}` }
      // })).data;

      // EVERY LOGIN: update user table with measurement_preference
      let measurePref = {
        strava_id: athleteData.id,
        measurement_preference: athleteData.measurement_preference
      };
      await userModel.updatePref(measurePref);

      let bikesInDb = await bikeModel.get(athleteData.id);     
      console.log('bikesinDb', bikesInDb); 

      if (bikesInDb.length === 0 && athleteData.bikes.length > 0) { // assume first login
        console.log('first login');

          await getTotTimes(athleteData.bikes, token);
          // await getBikeDetails(athleteData.bikes, token);
        
        addBikePromises = [];
        for (bike of athleteData.bikes) {
          bike.strava_id = athleteData.id;
          let bikePromise = async () => {

            console.log('bike in Promise', bike)
            await bikeModel.post(bike);
          }
          addBikePromises.push(bikePromise());
        }
        await Promise.all(addBikePromises);
        res.sendStatus(200);
        return;
      }

      if (bikesInDb) {
        // check if any new bikes in athleteData and add to DB

        // update distance_current and time_current since last logged activity
        console.log('user has bikes in Db');
      }

      if (!bikesInDb && athleteData.bikes.length === 0) {
        // prompt user to add bikes via Strava
      }


      res.send(athleteData);

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
  console.log('refreshed tokens:', response.data);
  return response.data;
};


const getTotTimes = async (bikes, token) => {
  let bikeIds = [];
  bikes.forEach(bike => { 
    bikeIds.push(bike.id);
    bike.time_current = 0;
  });

  for (bike of bikes) {
    let details = (await axios.get(`${urls.stravaApi}/gear/${bike.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })).data;

    bike.brand_name=details.brand_name;
    bike.model_name=details.model_name;
    bike.frame_type=details.frame_type;
    bike.description=details.description;
    console.log('BIKE', bike)
  }

  // total times
  page = 1;
  while (true) {
    let activities = (await axios.get(`${urls.stravaApi}/athlete/activities?page=${page}`, {
      headers: { Authorization: `Bearer ${token}` }
    })).data;

    if (activities.length === 0) break;

    for (activity of activities) {
      if ( activity.type === 'Ride' && activity.gear_id && bikeIds.includes(activity.gear_id) ) {
        
        for (bike of bikes) {
          
          if (bike.id === activity.gear_id) {
            bike.time_current = bike.time_current + activity.moving_time;
        
          }

        }
      }
    }
    page++;
  }
  return bikes;
}

// const getBikeDetails = async (bike, token) => {
  
//   let details = (await axios.get(`${urls.stravaApi}/gear/${bike.id}`, {
//     headers: { Authorization: `Bearer ${token}` }
//   })).data;

//   bike.brand_name=details.brand_name;
//   bike.model_name=details.model_name;
//   bike.frame_type=details.frame_type;
//   bike.description=details.description;
//   return bike;
// }