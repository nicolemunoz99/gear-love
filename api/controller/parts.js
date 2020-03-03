const {dbQuery, insert} = require ('../model');

const partModel = {
  get: async function (req, res) {
    console.log('req.query', req.query)
    let params = {
      text: `SELECT * FROM gear.parts where bike_id = '${req.query.bike_id}'`,
    };
    res.send(await dbQuery(params));
  },

  post: async function (req, res) {
    req.body.bike_id = req.query.bike_id;
    console.log('req.body', req.body);
    await insert('gear.parts', req.body);
    await partModel.get(req, res);
  },

  put: async(req, res) => {
    
  }

}

module.exports = partModel;