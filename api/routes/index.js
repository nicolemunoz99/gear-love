const express = require('express');
const router = express.Router();

const partModel = require('../model/partModel.js');
const users = require('../controller/').users;
const userModel = require('../model/userModel.js');

// router.get('/bikes', bikes.get);
// router.post('/bikes', bikes.post);
// router.delete('/:bikeId', bikes.delete);

router.get('/parts', partModel.get);
// router.post('/:bikeId/parts', parts.post);
// router.delete('/parts/:partId', parts.delete);
// router.put('/parts/:partId', parts.put);

router.get('/users/signup', users.signup); // strava auth page redirects to this endpoint
router.get('/users/login', users.login);
router.get('/users', userModel.get); // returns number of occurences of a u/n in db
router.post('/users', userModel.post); // posts new username and pw


module.exports = router;