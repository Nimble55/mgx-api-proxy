const express = require('express');
const axios = require('axios');
const app = express();

// Allow JSON body parsing
app.use(express.json());

// Optional root route just to check if server is live
app.get('/', (req, res) => {
  res.send('Backend is running! Use POST /api/getData to talk to Claude.');
});

// Main route for MGX
app.post('/api/getData', async (req, res) => {
  try {
    const prompt = req.body.prompt || "Hello from MGX!"; // Default prompt if none provided

    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      {
        model: "claude-3-sonnet-20240229", // Use Claude 3 model
        max_tokens: 300,
        messages: [
          { role: "user", content: prompt }
        ]
      },
      {
        headers: {
          "x-api-key": process.env.CLOUD_API_KEY, // Secure API key from Render
          "Content-Type": "application/json",
          "anthropic-version": "2023-06-01"
        }
      }
    );

    res.json(response.data); // Send Claude's reply back to MGX

  } catch (error) {
    console.error("Claude API error:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "API request failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));