const axios = require('axios');

const generateVoiceResponse = async (text) => {
  try {
    const response = await axios.post(
      'https://api.elevenlabs.io/v1/text-to-speech',
      { text },
      {
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': process.env.ELEVENLABS_API_KEY,
        },
      }
    );

    return response.data.audio_url; // Assuming the API returns an audio URL
  } catch (error) {
    throw new Error(`Failed to generate voice response: ${error.message}`);
  }
};

module.exports = { generateVoiceResponse };