const express = require('express');
const passport = require('passport');
require('../config/passport-setup');
const { authCheck } = require('../middleware/requireAuth');

const router = express.Router();

router.get('/google', passport.authenticate('google', {
    scope: ['profile'],
  })
); 

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/auth/success');
});

router.get('/success', authCheck, (req, res)=> {
  res.render('smoothies', { user: req.user });
});

module.exports = router;