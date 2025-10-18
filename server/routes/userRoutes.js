const express = require('express');
const router = express.Router();
const { registerUser, getUser, getFamilyPhoneNumbers, getFamilyLocations } = require('../controllers/userController');

// POST /api/users
router.post('/', registerUser);

// GET /api/users/:id
router.get('/:id', getUser);

// GET /api/users/:id/family-phones
router.get('/:id/family-phones', getFamilyPhoneNumbers);

// GET /api/users/:id/family-locations/:familyId
router.get('/:id/family-locations/:familyId', getFamilyLocations);

module.exports = router;