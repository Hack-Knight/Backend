const express = require('express');
const router = express.Router();
const { createAlert, getAlerts } = require('../controllers/alertController');
const { generateVoiceResponse } = require('../services/elevenLabsService');

// POST /api/alerts
router.post('/', createAlert);

// GET /api/alerts/:userId
router.get('/:userId', getAlerts);

// POST /api/voice
router.post('/voice', async (req, res, next) => {
  try {
    const { text } = req.body;
    const audioUrl = await generateVoiceResponse(text);
    res.status(200).json({ audioUrl });
  } catch (error) {
    next(error);
  }
});

///---------------Test below this line for now ------------------///////
// router.get('/:userParent', (req, res) => {
//   const { userParent } = req.params;
//   // Logic to get alerts for the parent user
//   res.send(`Get alerts for parent user: ${userParent}`);
// });

// router.post('/:userParent', (req, res) => {
//   const { userParent } = req.params;
//   // Logic to create an alert for the parent user
//   res.send(`Create alert for parent user: ${userParent}`);
// });

// router.post('/:userContact', (req, res) => {
//     const { userContact } = req.params;
//     // Logic to create an alert for the user contact
//     res.send(`Create alert for user contact: ${userContact}`);
// }); 



module.exports = router;