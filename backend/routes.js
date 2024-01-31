const express = require('express');
const NewsItem = require('./models/NewsItem');

const router = express.Router();

router.get('/news', async (req, res) => {
  try {
    const mongoNews = await NewsItem.find().sort({ time: -1 });
    res.json(mongoNews);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
