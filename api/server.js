const express = require ('express');
const router = require('./routes/index.js');
const cors = require('cors');
const path = require('path');
const port = 7500;
const app = express();
app.use('*', cors());

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router)

app.get('/exchange_token', (req, res) => {
  console.log(req.query) //state, code, scope
  res.send(req.query)
 res.redirect('http://127.0.0.1:8080')
 

});


app.listen(port, () => console.log('Server listening on port ' + port))
