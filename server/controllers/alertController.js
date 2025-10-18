const Alert = require('../models/Alert');

// Create a new alert
const createAlert = async (req, res, next) => {
  try {
    const alert = await Alert.create(req.body);
    res.status(201).json(alert);
  } catch (error) {
    next(error);
  }
};

// Get alerts by user ID
const getAlerts = async (req, res, next) => {
  try {
    const alerts = await Alert.find({ userId: req.params.userId });
    res.status(200).json(alerts);
  } catch (error) {
    next(error);
  }
};

module.exports = { createAlert, getAlerts };