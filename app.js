const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRouter');
const googleRouter = require('./routes/googleRoute');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const { requireAuth, checkUser } = require('./middleware/requireAuth');
const passport = require('passport');
const session = require('express-session');
const keys = require('./config/keys');

const app = express();

app.use(session({
  secret: keys.session.secret,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// view engine
app.set('view engine', 'ejs');

const PORT = process.env.PORT;


// database connection
const dbURI = process.env.dubRI;
mongoose.connect(dbURI)
  .then((result) =>{ 
    app.listen(PORT);
    console.log(`app listening at port ${PORT}`);
  })
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser)
app.get('/', (req, res) => res.render('home'));
app.use(authRouter);
app.use('/auth', googleRouter);
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
