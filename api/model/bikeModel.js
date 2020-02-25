const {dbQuery, insert} = require('./index.js');

const bikeModel = {
  get: async (stravaId) => {
    let params = {
      name: 'get-bikes',
      text: `SELECT * FROM gear.bikes WHERE strava_id = ${stravaId}`
    }
    let bikes = await dbQuery(params)
    return bikes;
  },

  post: async (bikeData) => {
    bikeData.time_on_add = bikeData.time_current;
    bikeData.dist_on_add = bikeData.dist_current;
    await insert('gear.bikes', bikeData);
  },

  delete: () => {

  }

}






module.exports = bikeModel