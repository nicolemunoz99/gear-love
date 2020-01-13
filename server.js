const express = require ('express');
const router = require('./server/routes/index.js');
const cors = require('cors');
const port = 7500;
const app = express();
app.use('*', cors());

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router)

app.listen(port, () => console.log('Server listening on port ' + port))