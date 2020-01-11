const express = require('express');
const router = express.Router();
const bikes = require('../controller/index.js').bikes;
const parts = require('../controller/index.js').parts;

router.get('/bikes', bikes.get);
router.post('/bikes', bikes.post);
router.delete('/:bike_id', bikes.delete);

router.get('/:bike_id/parts', parts.get);
router.post('/:bike_id/parts', parts.post);
router.delete('/:bike_id/parts/:part_id', parts.delete);

module.exports = router;