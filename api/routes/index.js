const express = require('express');
const router = express.Router();

const parts = require('../controller/parts.js');
const users = require('../controller/users.js');
const login = require('../controller/login.js');

router.get('/parts', parts.get);
router.post('/parts', parts.post);
router.put('/parts', parts.put);


router.get('/users/check', users.checkUsername); // returns number of occurences of a u/n in db
router.post('/users', users.post); // post new username and pw
router.delete('/users/logout', users.logout)
router.get('/users/stravaAuth', users.stravaAuth); // strava auth page redirects here
router.get('/users/login', login);




module.exports = router;