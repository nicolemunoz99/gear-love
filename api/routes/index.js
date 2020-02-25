const express = require('express');
const router = express.Router();

const parts = require('../controller/parts.js');
const users = require('../controller/users.js')

router.get('/parts', parts.get);
router.post('/parts', parts.post);
router.put('/parts', parts.put);
// router.put('/parts', partModel.put);
// router.post('/:bikeId/parts', parts.post);
// router.delete('/parts/:partId', parts.delete);
// router.put('/parts/:partId', parts.put);

router.get('/users/check', users.checkUsername); // returns number of occurences of a u/n in db
router.post('/users', users.post); // posts new username and pw
router.get('/users/stravaAuth', users.stravaAuth); // strava auth page redirects to this endpoint
router.get('/users/login', users.login);




module.exports = router;