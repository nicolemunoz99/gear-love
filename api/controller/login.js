const { dbQuery, insert, update, get } = require('../model');
const bcrypt = require('bcrypt');
const axios = require('axios');
const xDate = require('xdate');
const _ = require('lodash');

const strava = require('../stravaAccess.js');
const urls = require('../../urls.js');
const saltSize = 12;




const login = async (req, res) => {
      
  let userAuth = await authenticate(req.query);
  console.log('ua', userAuth)
  if (userAuth.status) { res.sendStatus(userAuth.status); return; }

  // refresh token when expires within 30 minutes
  let token = userAuth.expires_at - Date.now() / 1000 > 60 * 30 ? 
              userAuth.access_token : await refreshToken(userAuth.user_id, userAuth.refresh_token);

  // get athlete data
  let athleteData = (await axios.get(`${urls.stravaApi}/athlete`, {
    headers: { Authorization: `Bearer ${token}` }
  })).data;

  console.log('athleteData', athleteData)
  // get latest activity
  let lastRide = await getLastRide(token);
  
  // update measurement pref, latest activity, session 
  let updatedAthlete = (await update('users.info', {
    whereVar: {user_id: userAuth.user_id}, 
    updateVars: {
      measurement_preference: athleteData.measurement_preference,
      last_ride_id: lastRide.id,
      last_ride_name: lastRide.name
    }
  }))[0];
  

  // check if user has bikes in DB
  let bikeQuery = `SELECT * FROM (SELECT bike_id AS id, * FROM gear.bikes WHERE strava_id=${updatedAthlete.strava_id}) a ` + 
                  `LEFT JOIN gear.parts ON a.id=gear.parts.bike_id`;
  
  let bikesInDb = await dbQuery(bikeQuery);

  if (req.query.refresh || bikesInDb.length === 0) {
    await refreshStravaData(updatedAthlete, token);
  }
  console.log('bikesInDb', bikesInDb)

  let bikes = [];
  bikesInDb.forEach(item1 => {
    if ( !bikes.find(bike => bike.bike_id === item1.bike_id) && item1.id !== null) {
      item1.bike_id = item1.id;
      let bike = _.pick(item1, ['bike_id', 'name', 'brand_name', 'model_name', 'description', 'frame_type', 'dist_on_add', 'dist_current', 'time_on_add', 'time_current', 'image', 'bike_date_added']);
      
      bike.parts = [];
      bikesInDb.forEach(item2 => {
        if (item2.bike_id === item1.bike_id && item2.part_id !== null) {
          let part = _.pick(item2, ['part_id', 'date_added', 'type', 'custom_type', 'brand', 'model', 'dist_at_add', 'time_at_add', 'lifespan_dist', 'lifespan_time', 'tracking_method', 'useage_metric', 'current_wear_method', 'current_wear_dist', 'current_wear_time']);
          bike.parts.push(part);
        }
      });
      bikes.push(bike);
    }
  });
  
  // let query = `SELECT a.date_added AS bikes_date_added, * FROM ` +
  //             `(SELECT * FROM users.info LEFT JOIN gear.bikes ON users.info.strava_id=gear.bikes.strava_id WHERE user_id=${updatedAthlete.user_id}) a ` +
  //             `LEFT JOIN gear.parts ON gear.parts.bike_id_ref=a.bike_id`;  


  // let dbData = await dbQuery(query);

  // console.log('dbData', dbData)

  // let user = _.pick(updatedAthlete, ['user_id', 'strava_id', 'join_date', 'measurement_preference', 'last_ride_id', 'last_ride_name']);
  // user.session = userAuth.session;
  // let bikes = [];

  // console.log('user', user)
  
  // dbData.forEach(item => {
  //   if ( !bikes.find(bike => bike.bike_id === item.bike_id) ) {
  //     let bike = _.pick(item, ['bike_id', 'name', 'brand_name', 'model_name', 'description', 'frame_type', 'dist_on_add', 'dist_current', 'time_on_add', 'time_current', 'image', 'bike_date_added']);
  //     if (bike.bike_id !== null) {
  //       bike.parts = [];
  //       dbData.forEach(item2 => {
  //         if (item2.bike_id === item.bike_id) {
  //           let part = _.pick(item2, ['bike_id', 'part_id', 'date_added', 'type', 'custom_type', 'brand', 'model', 'dist_at_add', 'time_at_add', 'lifespan_dist', 'lifespan_time', 'tracking_method', 'useage_metric', 'current_wear_method', 'current_wear_dist', 'current_wear_time']);
  //           if (part.part_id !== null) bike.parts.push(part);
  //         }
  //       });
  //       bikes.push(bike);
  //     }   
  //   }
  // });
  
  // user.bikes = bikes;
  
  let user = _.pick(updatedAthlete, ['user_id', 'strava_id', 'join_date', 'measurement_preference', 'last_ride_id', 'last_ride_name']);
  user.session = userAuth.session;
  user.bikes = bikes;
  
  console.log('user', user)
  res.send(user);
};

const refreshStravaData = async (athleteData, token) => {

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

  await Promise.all(addBikePromises);

};

module.exports = login;

/////////////////////////
// helper funcs
/////////////////////////


const authenticate = async (query) => {
  let userAuth;
  let session;

  if (!query.username && !query.session) {
    console.log('no login or session')
    return {status: 209};
  }

  // via username/pw
  if (query.username) {
    userAuth = (await get('users.auth', {username: query.username}))[0];
    console.log('userAuth', userAuth)
    if (!userAuth) {
      return {data: null};
    }

    let pwAttempt = await bcrypt.hash(query.pw, userAuth.salt);

    // username/pw don't match
    if (userAuth.pw !== pwAttempt) { 
      return {data: null}; 
    };

    // create new session
    session = await bcrypt.genSalt(saltSize);
    userAuth.session = session;
    await update('users.sessions', {
      whereVar: {user_id: userAuth.user_id}, 
      updateVars: {session: session, expires_at: Date.now() }
    });
  }

  // authenticate via session
  if (query.session) { 
    let params = {text:
      `SELECT * FROM users.sessions LEFT JOIN users.auth ON users.sessions.user_id=users.auth.user_id WHERE users.sessions.session='${query.session}'`
    }

    // check if session expired
    
    userAuth = (await dbQuery(params))[0];
    if ( !userAuth || userAuth.expires_at > (xDate().addDays(3)).getTime() ) {
      console.log('session expired or doesnt exist')
      return { status: 209 }; // session expired or doesn't exist
    }
    userAuth.session = query.session;
  }

  if (userAuth.scope != 'read,activity:read_all,profile:read_all') {
    console.log('incorrect scope');
    return { status: 227 } // user hasn't given proper strava auth; TODO - frontend 
  }

  return userAuth;

};


const refreshToken = async (userId, refreshToken) => {

  let stravaRefreshQuery = `?client_id=${strava.clientId}` +
    `&client_secret=${strava.clientSecret}` +
    `&refresh_token=${refreshToken}` +
    `&grant_type=refresh_token`;

  let refreshedTokens = (await axios.post(`https://www.strava.com/oauth/token${stravaRefreshQuery}`)).data;

  delete refreshedTokens.token_type;
  let dataToUpdate = {
    whereVar: {user_id: userId},
    updateVars: refreshedTokens
  };
  await update('users.auth', dataToUpdate); // update with refreshed tokens
  return refreshedTokens.access_token;

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