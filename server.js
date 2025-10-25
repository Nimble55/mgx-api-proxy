const express = require('express');
const axios = require('axios');
const app = express();

app.get('/api/getData', async (req, res) => {
  try {
    const apiUrl = 'https://api.anthropic.com/v1/complete'; // Claude API endpoint

    const response = await axios.post(
      apiUrl,
      {
        model: "claude-2",
        prompt: "Hello world", // Replace with dynamic prompt if needed
        max_tokens_to_sample: 300
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.CLOUD_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Cloud API error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'API request failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));