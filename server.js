const express = require ('express');
const router = require('./server/routes/index.js');

const app = express();
const port = 7500;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.listen(port, () => console.log('Server listening on port ' + port))