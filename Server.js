const express = require('express');
const axios = require('axios');
const app = express();

app.get('/api/getData', async (req, res) => {
  try {
    const response = await axios.get('https://cloudapi.com/data', {
      headers: { 'Authorization': `Bearer ${process.env.CLOUD_API_KEY}` }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'API request failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
