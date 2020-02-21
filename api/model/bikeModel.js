const dbQuery = require('./index.js')

const bikeModel = {
  get: async (stravaId) => {
    let params = {
      name: 'get-bikes',
      text: `SELECT * FROM gear.bikes WHERE strava_id = ${stravaId}`
    }
    let bikes = (await dbQuery(params))
    return bikes;
  },

  post: async (bikeData) => {

    ({ id, strava_id, distance, time_current, name, brand_name, model_name, frame_type, description } = {...bikeData});
    let params = {
      name: 'post-bike',
      text: 'INSERT into gear.bikes(bike_id, strava_id, dist_on_add, dist_current, time_on_add, time_current, name, brand_name, model_name, frame_type, description) '+
            'VALUES($1, $2, $3, $3, $4, $4, $5, $6, $7, $8, $9)',
      values: [id, strava_id, distance, time_current, name, brand_name, model_name, frame_type, description]
    };
    await dbQuery(params);
  },

  delete: () => {

  }

}






module.exports = bikeModel