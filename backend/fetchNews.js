const axios = require('axios');
const mongoose = require('mongoose');
const cron = require('node-cron');
const NewsItem = require('./models/NewsItem');

let news = [];

const fetchNews = async () => {
  try {
    const pages = 3;

    const topStoriesResponse = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
    const topStoryIds = topStoriesResponse.data.slice(0, 30 * pages);

    const newsPromises = topStoryIds.map(async (storyId) => {
      const storyResponse = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`);
      return storyResponse.data;
    });

    const allNewsResults = await Promise.allSettled(newsPromises);

    const allNews = allNewsResults
      .filter((result) => result.status === 'fulfilled')
      .map((result) => result.value);

    for (let page = 0; page < pages; page++) {
      const startIndex = page * 30;
      const endIndex = startIndex + 30;
      news.push(allNews.slice(startIndex, endIndex));
    }

    await Promise.all(
      allNews.map(async (item) => {
        // Set a default value of 1 if descendants is NaN
        if (isNaN(item.descendants)) {
            item.descendants = 1;
          }
  
        const existingItem = await NewsItem.findOne({ id: item.id });
        if (existingItem) {
          existingItem.score += 1;
          existingItem.descendants += 1;
          await existingItem.save();
        } else {
          await NewsItem.create(item);
        }
      })
    );
  } catch (error) {
    console.error('Error fetching news:', error);
  }
};

module.exports = fetchNews;
