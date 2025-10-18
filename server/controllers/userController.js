const User = require('../models/User');
const { sendPushNotification } = require('../services/firebaseService');
const { generateVoiceResponse } = require('../services/elevenLabsService');

// Register a new user
const registerUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// Get user by ID
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Fetch family members' phone numbers
const getFamilyPhoneNumbers = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate('family.memberId', 'phone name');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const familyPhoneNumbers = user.family.map((member) => ({
      name: member.memberId.name,
      phone: member.memberId.phone,
      relationship: member.relationship,
    }));

    res.status(200).json(familyPhoneNumbers);
  } catch (error) {
    next(error);
  }
};

// Fetch family members' locations (admin only)
const getFamilyLocations = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is an admin
    const familyMember = user.family.find((member) => member.memberId.toString() === req.params.familyId);
    if (!familyMember || !familyMember.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const familyLocations = await User.findById(req.params.familyId, 'currentLocation name');
    res.status(200).json(familyLocations);
  } catch (error) {
    next(error);
  }
};

// Fetch caregivers' phone numbers for a patient
const getCaregiverPhoneNumbers = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate('caregivers.caregiverId', 'name phone');
    if (!user || user.role !== 'user') {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const caregiverPhoneNumbers = user.caregivers.map((caregiver) => ({
      name: caregiver.name,
      phone: caregiver.phone,
    }));

    res.status(200).json(caregiverPhoneNumbers);
  } catch (error) {
    next(error);
  }
};

// Fetch patients' locations (caregiver only)
const getPatientLocations = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const patients = await User.find({ _id: { $in: user.patients.map((p) => p.patientId) } }, 'currentLocation name');
    res.status(200).json(patients);
  } catch (error) {
    next(error);
  }
};

// Send push notification to caregiver
const notifyCaregiver = async (req, res, next) => {
  try {
    const { caregiverToken, title, body } = req.body;
    const response = await sendPushNotification(caregiverToken, title, body);
    res.status(200).json({ message: 'Notification sent', response });
  } catch (error) {
    next(error);
  }
};

// Trigger ElevenLabs AI agent standby
const triggerAIStandby = async (req, res, next) => {
  try {
    const { text } = req.body;
    const audioUrl = await generateVoiceResponse(text);
    res.status(200).json({ message: 'AI agent on standby', audioUrl });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, getUser, getFamilyPhoneNumbers, getFamilyLocations, getCaregiverPhoneNumbers, getPatientLocations, notifyCaregiver, triggerAIStandby };