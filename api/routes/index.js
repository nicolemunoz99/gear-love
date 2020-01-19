const express = require('express');
const router = express.Router();
const bikes = require('../controller/index.js').bikes;
const parts = require('../controller/index.js').parts;

router.get('/bikes', bikes.get);
router.post('/bikes', bikes.post);
router.delete('/:bikeId', bikes.delete);

router.get('/:bikeId/parts', parts.get);
router.post('/:bikeId/parts', parts.post);
router.delete('/parts/:partId', parts.delete);
router.put('/parts/:partId', parts.put)

module.exports = router;