const request = require('supertest');
const express = require('express');
const passport = require('passport');
const User = require('../models/userModel');
const userController = require('../controllers/userController');

const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use('/api/users', userController);

jest.mock('../models/userModel');
jest.mock('passport');

describe('User Controller', () => {
  afterEach(() => {
    User.findById.mockReset();
  });

  test('GET / - Retrieve user profile', async () => {
    const user = { id: '1', preferences: {}, history: [] };
    User.findById.mockResolvedValue(user);

    const res = await request(app).get('/api/users');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(user);
  });

  test('GET / - User not found', async () => {
    User.findById.mockResolvedValue(null);

    const res = await request(app).get('/api/users');

    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({ error: 'User not found' });
  });

  test('POST /preferences - Update user preferences', async () => {
    const user = { id: '1', preferences: {}, history: [], save: jest.fn().mockResolvedValue(true) };
    User.findById.mockResolvedValue(user);

    const newPreferences = { topic: 'AI' };
    const res = await request(app).post('/api/users/preferences').send({ preferences: newPreferences });

    expect(res.statusCode).toEqual(200);
    expect(user.preferences).toEqual(newPreferences);
  });

  test('POST /preferences - User not found', async () => {
    User.findById.mockResolvedValue(null);

    const res = await request(app).post('/api/users/preferences').send({ preferences: {} });

    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({ error: 'User not found' });
  });

  test('GET /history - Retrieve user reading history', async () => {
    const user = { id: '1', preferences: {}, history: ['article1', 'article2'], save: jest.fn().mockResolvedValue(true) };
    User.findById.mockResolvedValue(user);

    const res = await request(app).get('/api/users/history');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(user.history);
  });

  test('POST /history - Update user reading history', async () => {
    const user = { id: '1', preferences: {}, history: ['article1', 'article2'], save: jest.fn().mockResolvedValue(true) };
    User.findById.mockResolvedValue(user);

    const newArticle = 'article3';
    const res = await request(app).post('/api/users/history').send({ article: newArticle });

    expect(res.statusCode).toEqual(200);
    expect(user.history).toContain(newArticle);
  });

  test('POST /history - User not found', async () => {
    User.findById.mockResolvedValue(null);

    const res = await request(app).post('/api/users/history').send({ article: 'article3' });

    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({ error: 'User not found' });
  });
});
