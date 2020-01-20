const dbQuery = require ('./index.js');

const partModel = {
  get: async (bikeId, toController) => {
    let params = {
      name: 'get-parts',
      text: 'SELECT * FROM gear.parts where bike_id = $1',
      values: [bikeId]
    }
    let data = await dbQuery(params, toController)
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
  },

  delete: async (partId, toController) => {
    let params = {
      name: 'delete-a-part',
      text: 'DELETE FROM gear.parts WHERE part_id = $1',
      values: [partId]
    };
    dbQuery(params, toController);
    let data = await dbQuery;
  },

  put: async (partId, dataToUpdate, toController) => {
    let field = Object.keys(dataToUpdate)[0];
    let updateValue = Number(dataToUpdate[field]);
    console.log(updateValue, Number(updateValue))
    let params = {
      name: 'update-a-part',
      text: `UPDATE gear.parts SET ${field} = $1 WHERE part_id = ${partId}`,
      values: [updateValue]
    }
    dbQuery(params, toController);
    let data = await dbQuery;

  }
}

module.exports = partModel;