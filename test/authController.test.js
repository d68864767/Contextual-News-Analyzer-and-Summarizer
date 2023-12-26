const request = require('supertest');
const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

const app = express();
app.use('/api/auth', authController);

jest.mock('passport');

describe('Auth Controller', () => {
  afterEach(() => {
    passport.authenticate.mockReset();
  });

  test('GET /login', async () => {
    passport.authenticate.mockReturnValue((req, res, next) => next());

    const response = await request(app).get('/api/auth/login');

    expect(passport.authenticate).toHaveBeenCalledWith('oauth2');
    expect(response.status).toBe(200);
  });

  test('GET /callback', async () => {
    passport.authenticate.mockReturnValue((req, res, next) => {
      req.user = { id: '123' };
      next();
    });

    const response = await request(app).get('/api/auth/callback');

    expect(passport.authenticate).toHaveBeenCalledWith('oauth2', { failureRedirect: '/login' });
    expect(response.status).toBe(200);
  });

  test('GET /logout', async () => {
    const response = await request(app).get('/api/auth/logout');

    expect(response.status).toBe(200);
    expect(response.headers.location).toBe('/');
  });
});
