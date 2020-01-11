const bikeModel = require('../model/bikeModel.js')
const partModel = require('../model/partModel.js')


module.exports = {
  bikes: {
    get: (req, res) => {
      bikeModel.get(req.query.userId, (err, result) => {
        if (err) { 
          res.sendStatus(500);
          console.log(err)
        } else {
          res.send(result);
        }
      })
    },
    post: (req, res) => {
      let data = req.body;
      bikeModel.post(data, (err, result) => {
        if (err) { res.sendStatus(400) }
        else { 
          console.log('result in controller', result)
          res.send(result)
        }
      })
    },
    delete: () => {

    }
  },

  parts: {
    get: () => {

    },
    post: () => {

    },
    delete: () => {

    }
  }
}