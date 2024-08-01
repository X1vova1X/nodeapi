// server.js
const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.get('/v1/webhook', async (req, res) => {
  const { url, content } = req.query;

  if (!url || !content) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    await axios.post(url, { content });
    return res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message to Discord webhook:', error);
    return res.status(500).json({ error: 'Failed to send message' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});