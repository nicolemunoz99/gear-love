const express = require('express');
const router = express.Router();
const bikes = require('../controller/').bikes;
const parts = require('../controller/').parts;
const users = require('../controller/').users;

router.get('/bikes', bikes.get);
router.post('/bikes', bikes.post);
router.delete('/:bikeId', bikes.delete);

router.get('/:bikeId/parts', parts.get);
router.post('/:bikeId/parts', parts.post);
router.delete('/parts/:partId', parts.delete);
router.put('/parts/:partId', parts.put);

router.get('/users', users.get); // returns number of occurences of a u/n in db
router.post('/users', users.post); // posts new u/n and p/w
router.put('/users/initialize', users.initialize); // update with permanent oauth tokens

module.exports = router;