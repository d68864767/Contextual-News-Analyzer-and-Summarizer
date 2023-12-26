const request = require('supertest');
const express = require('express');
const newsController = require('../controllers/newsController');
const News = require('../models/newsModel');

const app = express();
app.use(express.json());
app.get('/api/news', newsController.getNews);
app.post('/api/news/summarize', newsController.summarizeArticle);
app.post('/api/news/contextualize', newsController.contextualizeArticle);

describe('News Controller', () => {
  it('should fetch all news articles', async () => {
    const news = new News({
      title: 'Test News',
      url: 'https://testnews.com',
      source: 'Test Source'
    });
    await news.save();

    const res = await request(app).get('/api/news');
    expect(res.statusCode).toEqual(200);
    expect(res.body[0]).toHaveProperty('title', 'Test News');
  });

  it('should summarize a news article', async () => {
    const res = await request(app)
      .post('/api/news/summarize')
      .send({ articleUrl: 'https://testnews.com' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('summary');
  });

  it('should provide context for a news article', async () => {
    const res = await request(app)
      .post('/api/news/contextualize')
      .send({ articleUrl: 'https://testnews.com' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('context');
  });
});
