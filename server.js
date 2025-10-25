const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Test endpoint to check server status
app.get('/', (req, res) => {
  res.send('✅ Backend is running! Use POST /api/getData with JSON body.');
});

// Main proxy endpoint
app.post('/api/getData', async (req, res) => {
  const prompt = req.body.prompt;

  if (!prompt) {
    return res.status(400).json({ error: 'No prompt provided' });
  }

  try {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-sonnet-4-5-20250929', // Your latest Claude model
        max_tokens: 200,
        messages: [{ role: 'user', content: prompt }]
      },
      {
        headers: {
          'x-api-key': process.env.CLOUD_API_KEY, // API key from Render env variable
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Claude API request failed:', error.response?.data || error.message);
    res.status(500).json({ error: 'API request failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));