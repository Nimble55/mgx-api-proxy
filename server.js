const express = require('express');
const axios = require('axios');
const app = express();

// Root route (optional, just to test server is running)
app.get('/', (req, res) => {
  res.send('Backend is running! Use /api/getData to fetch data.');
});

// Endpoint for MGX to fetch data from Claude
app.get('/api/getData', async (req, res) => {
  try {
    const apiUrl = 'https://api.anthropic.com/v1/complete'; // Claude API endpoint

    // Make the request to Claude API
    const response = await axios.post(
      apiUrl,
      {
        model: "claude-2",                  // model name
        prompt: "Hello world",              // you can later make this dynamic
        max_tokens_to_sample: 300           // adjust if needed
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.CLOUD_API_KEY}`, // uses Render env variable
          'Content-Type': 'application/json'
        }
      }
    );

    // Send the API response back to MGX
    res.json(response.data);

  } catch (error) {
    // Print full error to Render logs for debugging
    console.error('Cloud API error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'API request failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));