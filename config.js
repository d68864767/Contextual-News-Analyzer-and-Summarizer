const OAuth2Strategy = require('passport-oauth2');

module.exports = function(passport) {
  passport.use(
    new OAuth2Strategy(
      {
        authorizationURL: process.env.AUTHORIZATION_URL,
        tokenURL: process.env.TOKEN_URL,
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
      },
      function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ oauthId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    )
  );

  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
};
