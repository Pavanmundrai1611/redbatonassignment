const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cron = require('node-cron');
const fetchNews = require('./fetchNews');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

mongoose.connect('mongodb+srv://pavan:redbaton@cluster0.f5oz4ue.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

cron.schedule('0 * * * *', () => {
  fetchNews();
});

fetchNews();

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
