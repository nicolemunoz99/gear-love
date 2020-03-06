const {dbQuery, insert} = require ('../model');
const xDate = require('xdate');

const partModel = {
  get: async function (req, res) {
    console.log('req.query', req.query, 'getting all parts...')
    let params = {
      text: `SELECT * FROM gear.parts where bike_id = '${req.query.bike_id}'`,
    };
    res.send(await dbQuery(params));
  },

  post: async function (req, res) {

    req.body.bike_id = req.query.bike_id;
    console.log('req.body', req.body, 'posting new part...');

    let newPart = req.body;
    newPart.date_added = Date.now();
    if (newPart.tracking_method === 'default' || newPart.current_wear_method === 'new') {
      newPart.current_wear_dist = 0;
      newPart.current_wear_time = 0;
      newPart.new_date = Date.now();
    }

    if (newPart.current_wear_method === 'strava') {
      newPart.new_date = (xDate(newPart.new_date)).getTime();


      // TO DO: calc current wear on part from strava API
    }

    // res.sendStatus(200);

    await insert('gear.parts', req.body);
    await partModel.get(req, res);
  },

  put: async(req, res) => {
    
  }

}

module.exports = partModel;