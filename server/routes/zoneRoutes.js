const express = require('express');
const router = express.Router();
const { createSafeZone, getSafeZones } = require('../controllers/zoneController');

// POST /api/safezones
router.post('/', createSafeZone);

// GET /api/safezones/:parentId
router.get('/:parentId', getSafeZones);

module.exports = router;