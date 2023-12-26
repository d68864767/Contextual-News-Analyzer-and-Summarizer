const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/userModel');

// @route   GET api/users
// @desc    Retrieve user profile
// @access  Private
router.get('/', passport.authenticate('oauth2', { session: false }), (req, res) => {
  User.findById(req.user.id)
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ error: 'User not found' }));
});

// @route   POST api/users/preferences
// @desc    Update user preferences
// @access  Private
router.post('/preferences', passport.authenticate('oauth2', { session: false }), (req, res) => {
  User.findById(req.user.id)
    .then(user => {
      user.preferences = req.body.preferences;
      user.save()
        .then(user => res.json(user))
        .catch(err => res.status(400).json({ error: 'Unable to update user preferences' }));
    })
    .catch(err => res.status(404).json({ error: 'User not found' }));
});

// @route   GET api/users/history
// @desc    Retrieve user reading history
// @access  Private
router.get('/history', passport.authenticate('oauth2', { session: false }), (req, res) => {
  User.findById(req.user.id)
    .then(user => res.json(user.history))
    .catch(err => res.status(404).json({ error: 'User not found' }));
});

// @route   POST api/users/history
// @desc    Update user reading history
// @access  Private
router.post('/history', passport.authenticate('oauth2', { session: false }), (req, res) => {
  User.findById(req.user.id)
    .then(user => {
      user.history.push(req.body.article);
      user.save()
        .then(user => res.json(user))
        .catch(err => res.status(400).json({ error: 'Unable to update user history' }));
    })
    .catch(err => res.status(404).json({ error: 'User not found' }));
});

module.exports = router;
