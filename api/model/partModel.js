const {dbQuery, insert} = require ('./index.js');

const partModel = {
  get: async (req, res) => {
    console.log('req.query', req.query)
    let params = {
      text: `SELECT * FROM gear.parts where bike_id = '${req.query.bike_id}'`,
    };
    res.send(await dbQuery(params));
  },

  post: async (req, res) => {
    req.body.bike_id = req.query.bike_id;
    let newPart = await insert('gear.parts', req.body);
    console.log(newPart);
    res.send(newPart);
  }

}

module.exports = partModel;