const User = require('../models/User');

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

module.exports = { registerUser, getUser, getFamilyPhoneNumbers, getFamilyLocations };