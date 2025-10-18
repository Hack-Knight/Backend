require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
const connectDB = require('./config/db');
connectDB();

// Routes
// Example: app.use('/api/users', require('./routes/userRoutes'));

// Dummy test route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Error handling middleware
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));