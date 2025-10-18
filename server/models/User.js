const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['admin', 'user'], required: true },
  phone: { type: String, required: true },
  safeZoneId: { type: mongoose.Schema.Types.ObjectId, ref: 'SafeZone' },
  currentLocation: {
    lat: { type: Number },
    lng: { type: Number },
  },
  caregivers: [
    {
      caregiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: { type: String },
      phone: { type: String },
    },
  ],
  patients: [
    {
      patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
  ],
});

module.exports = mongoose.model('User', userSchema);