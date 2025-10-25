const express = require('express');
const axios = require('axios');
const app = express();

// Endpoint for MGX to fetch data
app.get('/api/getData', async (req, res) => {
  try {
    // Replace this URL with the actual Claude API endpoint
    const apiUrl = 'https://api.anthropic.com/v1/complete';

    // Make the request to Claude API
    const response = await axios.post(apiUrl, 
      {
        model: "claude-2",       // example model, adjust if needed
        prompt: "Hello world",   // replace with dynamic prompt if needed
        max_tokens_to_sample: 300
      }, 
      {
        headers: { 
          'Authorization': `Bearer ${process.env.CLOUD_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Send back the API response to MGX
    res.json(response.data);

  } catch (error) {
    console.error('Cloud API error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'API request failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));