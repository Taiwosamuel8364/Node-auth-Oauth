const passport = require('passport');
const Googlestrategy = require('passport-google-oauth20');
const keys = require('./keys');
const user = require('../models/Oauth');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  user.findById(id)
  .then((user) => {
    done(null, user);
  });
});

passport.use( new Googlestrategy({
      callbackURL: '/auth/google/redirect',
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
    }, function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      user.findOne({ googleId: profile.id })
      .then((currentUser) => {
        if(currentUser) {
          done(null, currentUser);
          console.log(currentUser + 'user already created');
        } else {
          new user({
            username: profile.displayName,
            googleId: profile.id
          }).save()
          .then((newUser) => {
            done(null, newUser);
            console.log('new user created' + newUser);
          });
        };
      });
  })
);