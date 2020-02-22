const dbQuery = require ('./index.js');

const partModel = {
  get: async (req, res) => {
    let params = {
      text: 'SELECT * FROM gear.parts where bike_id = $1',
      values: [req.query.bike_id]
    };
    res.send(await dbQuery(params));
  },

  post: async (partData, toController) => {
    let {bikeId, distOnAdd, timeOnAdd, partType, partBrand, partModel, lifespanDistance, lifespanTime} = {...partData}
    let params = {
      name: 'post-a-part',
      text: 'INSERT INTO gear.parts (bike_id, dist_on_add, time_on_add, type, brand, model, lifespan_dist, lifespan_time) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      values: [bikeId, distOnAdd, timeOnAdd, partType, partBrand, partModel, lifespanDistance, lifespanTime]
    };
    dbQuery(params, toController);
    let data = await dbQuery;
  }
}

module.exports = partModel;