const User = require('../models/User');
const jwt = require('jsonwebtoken');
const handleError = require('../middleware/errorhandler');

//jwt function for token genrationdrd
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'net ninja secret', {
    expiresIn: maxAge
  });
};

module.exports.loginPage = (req, res) => {
  res.render('login');
}

module.exports.signupPage = (req, res) => {
  res.render('signup');
}

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  }
  catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
}

module.exports.signUp = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleError(err);
    console.log(err);
    res.status(400).json({ errors });
  }
  
}

module.exports.logout_get = (req, res, next) => {
  if(req.cookies) {
    res.cookie('jwt', "", { maxAge : 1 });
    res.redirect('/');
  } else if(req.user) {
    req.logout((err) => {
      if(err) {
        return next(err);
      }
      res.redirect('/');
    });
  } else {
    next();
  }
}
