const bikeModel = require('../model/bikeModel.js');
const partModel = require('../model/partModel.js');
const userModel = require('../model/userModel.js');


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
          res.send(result);
        }
      });
    },
    delete: () => {

    }
  },

  parts: {
    get: (req, res) => {
      
      partModel.get(req.params.bikeId, (err, result) => {
        if (err) { res.sendStatus(400) }
        else {
          res.send(result);
        }
      });
    },
    post: (req, res) => {
      let partData = req.body;
      partData.bikeId = req.params.bikeId
      partModel.post(partData, (err, result) => {
        if (err) { res.sendStatus(500) }
        else {
          res.send(result)
        }
      });
    },
    delete: (req, res) => {
      partModel.delete(req.params.partId, (err, result) => {
        if (err) { res.sendStatus(500) }
        else {
          res.sendStatus(204);
        }
      });
    },
    put: (req, res) => {
      partModel.put(req.params.partId, req.query, (err, results) => {
        res.sendStatus(204);
      });
    }
  },

  users: {
    get: (req, res) => {
      if (req.query.verify) {
        userModel.verify(req.query.username, (err, result) => {
          if (err) {
            res.sendStatus(500);
          }
          else {
            console.log('result', result)
            res.send({userExists: result.length});
          }          
        });
      }
      
      // check if access token is still valid; issue new if expired

    },

    post: (req, res) => {
      console.log(req.body);
      userModel.post(req.body, (err, result) => {
        res.sendStatus(200);
      });
    },

    initialize: (req, res) =>{

    },
  }
}