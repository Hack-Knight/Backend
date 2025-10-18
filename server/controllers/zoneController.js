const SafeZone = require('../models/SafeZone');

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

module.exports = { createSafeZone, getSafeZones };