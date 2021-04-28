const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const cookieParser = require('cookie-parser');
const Client = require('./models/client');
const Quote = require('./models/quote');
const URL = process.env.MONGODB_URI || 'mongodb://localhost/server';
const PORT = process.env.PORT || 3000;

var messages = [];

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connected to client database on MongoDB Atlas server.');
  })
  .catch((err) => {
    console.log('ERROR:', err.message);
  });

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(
  require('express-session')({
    secret: 'This is a secret',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser('secret'));
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

passport.use(new LocalStrategy(Client.authenticate()));
passport.serializeUser(Client.serializeUser());
passport.deserializeUser(Client.deserializeUser());

// passport.use(new LocalStrategy(Quote.authenticate()));
// passport.serializeUser(Quote.serializeUser());
// passport.deserializeUser(Quote.deserializeUser());

app.use('/', require('./routes/index'));
app.use('/clients', require('./routes/clients'));

app.listen(PORT, () => {
  console.log('FuelQuote server listening on port ' + PORT + '.');
});
