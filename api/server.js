const express = require ('express');
const router = require('./routes/index.js');
const cors = require('cors');
const port = 7500;
const app = express();
const urls = require('../urls.js');
const userModel = require('./model/userModel.js');
const strava = require('./stravaAccess.js');
const axios = require('axios');
app.use('*', cors());

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router);


app.get('/signup/:sessionId', (req, res) => {
  // recieve exchange token after user logs in on Strava
  console.log(req.query) //state, code, scope
  // console.log('sessionId', req.params.sessionId)
  sessionInfo = {
    session_id: req.params.sessionId,
    code: req.query.code
  };

  stravaAccessQuery = `?client_id=${strava.clientId}` +
                      `&client_secret=${strava.clientSecret}` +
                      `&code=${req.query.code}` +
                      `&grant_type=authorization_code`;
  // query strava to get REFRESH TOKEN and SHORT-LIVED ACCESS TOKEN
  axios.post(`https://www.strava.com/oauth/token${stravaAccessQuery}`)
    .then(response => {
      console.log('response: ', response.data)
      userInfo = response.data;
      userInfo.stravaId = userInfo.athlete.id;
      delete userInfo.athlete
      userModel.post(userInfo, (err, result) => {
        console.log('response from userModel: ', result)
        res.redirect(`${urls.client}`);
      });
    });
});


app.listen(port, () => console.log('Server listening on port ' + port))
