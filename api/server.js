const express = require ('express');
const router = require('./routes/index.js');
const cors = require('cors');
const port = 7500;
const app = express();
const urls = require('../urls.js')
const sessionModel = require('./model/sessionModel.js')
app.use('*', cors());

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router);


app.get('/exchangeToken/:sessionId', (req, res) => {
  // recieve exchange token after user logs in on Strava
  console.log(req.query) //state, code, scope
  console.log('sessionId', req.params.sessionId)
  sessionInfo = {
    session_id: req.params.sessionId,
    access_token: req.query.code
  };
  sessionModel(sessionInfo, (err, result) => {
    console.log('result from model', result)
    res.redirect(urls.client)
  });
});


app.listen(port, () => console.log('Server listening on port ' + port))
