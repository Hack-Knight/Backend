const mongoose = require('mongoose');

const safeZoneSchema = new mongoose.Schema({
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  center: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  radiusMeters: { type: Number, required: true },
});

module.exports = mongoose.model('SafeZone', safeZoneSchema);