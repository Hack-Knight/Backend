const SafeZone = require('../models/SafeZone');
const { haversineDistance } = require('../utils/geoUtils');
const { sendPushNotification } = require('../services/firebaseService');

// Create a new safe zone
const createSafeZone = async (req, res, next) => {
  try {
    const safeZone = await SafeZone.create(req.body);
    res.status(201).json(safeZone);
  } catch (error) {
    next(error);
  }
};

// Get safe zones by parent ID
const getSafeZones = async (req, res, next) => {
  try {
    const safeZones = await SafeZone.find({ parentId: req.params.parentId });
    res.status(200).json(safeZones);
  } catch (error) {
    next(error);
  }
};

// Validate user location against safe zone
const validateUserLocation = async (req, res, next) => {
  try {
    const { userId, currentLocation } = req.body;

    // Fetch the user's safe zone
    const safeZone = await SafeZone.findOne({ parentId: userId });
    if (!safeZone) {
      return res.status(404).json({ message: 'Safe zone not found' });
    }

    // Calculate the distance between the user's location and the safe zone center
    const distance = haversineDistance(currentLocation, safeZone.center);

    if (distance > safeZone.radiusMeters) {
      // Trigger alert if the user is outside the safe zone
      await sendPushNotification(
        req.body.caregiverToken,
        'User Out of Safe Zone',
        'The user has left the designated safe zone.'
      );
      return res.status(200).json({ message: 'User is outside the safe zone', distance });
    }

    res.status(200).json({ message: 'User is within the safe zone', distance });
  } catch (error) {
    next(error);
  }
};

module.exports = { createSafeZone, getSafeZones, validateUserLocation };