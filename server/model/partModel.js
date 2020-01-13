const dbQuery = require ('../db');

const partModel = {
  get: async (bikeId, toController) => {
    console.log('in model')
    let params = {
      name: 'get-parts',
      text: 'SELECT * FROM gear.parts where bike_id = $1',
      values: [bikeId]
    }
    let data = await dbQuery(params, toController)
  },

  post: async (partData, toController) => {
    let {bikeId, distWhenAdded, partType, partBrand, partModel, lifespanDistance} = {...partData}
    console.log('in model')
    let params = {
      name: 'post-a-part',
      text: 'INSERT INTO gear.parts (bike_id, dist_when_added, part_type, part_brand, part_model, lifespan_dist) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
      values: [bikeId, distWhenAdded, partType, partBrand, partModel, lifespanDistance]
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