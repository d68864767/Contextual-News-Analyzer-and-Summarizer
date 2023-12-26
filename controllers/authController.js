const express = require('express');
const passport = require('passport');
const router = express.Router();

// @route   GET api/auth/login
// @desc    Login User
// @access  Public
router.get('/login', passport.authenticate('oauth2'));

// @route   GET api/auth/callback
// @desc    OAuth2 callback
// @access  Public
router.get('/callback', 
  passport.authenticate('oauth2', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// @route   GET api/auth/logout
// @desc    Logout User
// @access  Public
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
