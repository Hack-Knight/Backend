const express = require('express');
const router = express.Router();
const { registerUser, getUser, getFamilyPhoneNumbers, getFamilyLocations, getCaregiverPhoneNumbers, getPatientLocations, notifyCaregiver, triggerAIStandby } = require('../controllers/userController');

// POST /api/users
router.post('/', registerUser);

// GET /api/users/:id
router.get('/:id', getUser);

// GET /api/users/:id/family-phones
router.get('/:id/family-phones', getFamilyPhoneNumbers);

// GET /api/users/:id/family-locations/:familyId
router.get('/:id/family-locations/:familyId', getFamilyLocations);

// GET /api/users/:id/caregivers
router.get('/:id/caregivers', getCaregiverPhoneNumbers);

// GET /api/users/:id/patients
router.get('/:id/patients', getPatientLocations);

// POST /api/users/notify-caregiver
router.post('/notify-caregiver', notifyCaregiver);

// POST /api/users/trigger-ai-standby
router.post('/trigger-ai-standby', triggerAIStandby);

module.exports = router;