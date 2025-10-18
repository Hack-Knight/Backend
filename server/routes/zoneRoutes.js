const express = require('express');
const router = express.Router();
const { createSafeZone, getSafeZones, validateUserLocation } = require('../controllers/zoneController');

// POST /api/safezones
router.post('/', createSafeZone);

// GET /api/safezones/:parentId
router.get('/:parentId', getSafeZones);

// POST /api/safezones/validate-location
router.post('/validate-location', validateUserLocation);

module.exports = router;