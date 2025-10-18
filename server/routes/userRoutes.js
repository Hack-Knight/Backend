const express = require('express');
const router = express.Router();
const { registerUser, getUser } = require('../controllers/userController');

// POST /api/users
router.post('/', registerUser);

// GET /api/users/:id
router.get('/:id', getUser);

module.exports = router;