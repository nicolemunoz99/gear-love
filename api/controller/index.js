const bikeModel = require('../model/bikeModel.js');
const partModel = require('../model/partModel.js');
const userModel = require('../model/userModel.js');
const axios = require('axios');
const strava = require('../stravaAccess.js');
const urls = require('../../urls.js');


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
    signup: (req, res) => {
      // recieve exchange token after user logs in on Strava
      console.log(req.query); //state, code, scope

      stravaAccessQuery = `?client_id=${strava.clientId}` +
        `&client_secret=${strava.clientSecret}` +
        `&code=${req.query.code}` +
        `&grant_type=authorization_code`;

      // query strava to get REFRESH TOKEN and SHORT-LIVED ACCESS TOKEN
      axios.post(`https://www.strava.com/oauth/token${stravaAccessQuery}`)
        .then(response => {
          console.log('response: ', response.data)
          userInfo = response.data;
          userInfo.scope = req.query.scope;
          userInfo.strava_id = userInfo.athlete.id;
          userInfo.username = req.query.username;
          delete userInfo.athlete
          userModel.stravaAuth(userInfo, (err, result) => {
            console.log('response from userModel: ', result)
            // TO DO post response to DB
            res.redirect(`${urls.client}`);
          });
        });
    },

    get: (req, res) => {
      if (req.query.verify) {
        userModel.verify(req.query.username, (err, result) => {
          if (err) {
            res.sendStatus(500);
          }
          else {
            console.log('result', result)
            res.send({ userExists: result.length });
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

    initialize: (req, res) => {

    },
  }
}