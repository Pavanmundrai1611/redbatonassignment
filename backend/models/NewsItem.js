const mongoose = require('mongoose');

const NewsItem = mongoose.model('NewsItem', {
  by: String,
  descendants: { type: Number, default: 0 },
  id: Number,
  kids: [Number],
  score: Number,
  time: Number,
  title: String,
  type: String,
  url: String,
});

module.exports = NewsItem;
