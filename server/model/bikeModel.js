const dbQuery = require('../db')

const bikeModel = {
  get: async (userId, toController) => {
    let params = {
      name: 'get-bikes',
      text: 'SELECT * FROM gear.bikes WHERE user_id = $1',
      values: [userId]
    }
    let data = await dbQuery(params, toController)
  },
  post: async (bikeData, toController) => {
    let {bikeId, brand, model, year, distanceAtSignup, userId} = {...bikeData};
    let params = {
      name: 'post-bike',
      text: 'INSERT into gear.bikes(bike_id, brand, model, model_year, distanceAtSignup, user_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
      values: [bikeId, brand, model, year, distanceAtSignup, userId]
    }
    let data = await dbQuery(params, toController)
  },
  delete: () => {

  }

}

module.exports = bikeModel