const express = require ('express');
const port = 8080;
const app = express();

app.use(express.static(__dirname + '/dist'));


app.listen(port, () => console.log('Server listening on port ' + port))
