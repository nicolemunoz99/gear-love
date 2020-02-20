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

    checkIfUniq: (req, res) => {
      if (req.query.verify) {
        userModel.verify(req.query.username, (err, result) => {
          if (err) {
            res.sendStatus(400);
          } else {
            res.send({ userExists: result.length });
          }
        });
      }
    },

    login: (req, res) => {
      console.log(req.query);

      userModel.login(req.query, (err, result) => {
        if (err) {
          res.sendStatus(500);

        }
        else if (result.length === 0) {
          res.sendStatus(204);

        } else {

        console.log(result)
        
        // if auth token expired
          // query strava for new token
          // update gear.users with new refresh/token
        
        // query strava for user's data
        // scrub data
        // send to client
        res.sendStatus(200)
      
      }

        
      })
    },

    post: (req, res) => {
      console.log(req.body);
      userModel.post(req.body, (err, result) => {
        res.sendStatus(200);
      });
    },

  }
}