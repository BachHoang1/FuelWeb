if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

const initializePassport = require('./passport-config');
initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

const users = [];

app.set('view-engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Route History
app.get('/', checkAuthenticated, (req, res) => {
  if (req.user.isFirst) {
    req.user.isFirst = false;
    return res.redirect('/profile');
  }
  res.render('quotehistory.ejs', {
    title: 'History',
    history: req.user.history,
  });
});

// Quote
app.get('/quote', checkAuthenticated, (req, res) => {
  res.render('quote.ejs', { title: 'Quote', user: req.user });
});

app.post('/quote', checkAuthenticated, (req, res) => {
  userprofile = req.user.profile;
  try {
    req.user.history.push({
      gallons: req.body.gallons,
      deliveryAddress: `${userprofile.address}, ${userprofile.city} ${userprofile.state} ${userprofile.zipcode}`,
      deliveryDate: req.body.deliveryDate,
      suggestedPrice: req.body.suggestedPrice,
      amountDue: 0.01,
    });
    res.redirect('/');
  } catch (e) {
    res.redirect('/quote');
  }
});

// Profile Route
app.get('/profile', checkAuthenticated, (req, res) => {
  res.render('profile.ejs', { title: 'Profile', profile: req.user.profile });
});

app.post('/profile', checkAuthenticated, (req, res) => {
  userprofile = req.user.profile;
  try {
    (req.user.profile = {
      name: req.body.name,
      address: req.body.address,
      address2: req.body.address2,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode,
    }),
      res.redirect('/');
  } catch (e) {
    res.redirect('/profile');
  }
});

// Login Route
app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs', { title: 'Login' });
});

app.post(
  '/login',
  checkNotAuthenticated,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

// Register Route
app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs', { title: 'Register' });
});

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      email: req.body.email,
      password: hashedPassword,
      isFirst: true,
      profile: {
        name: req.body.name,
        address: '',
        address2: '',
        city: '',
        state: '',
        zipcode: '',
      },
      history: [],
    });
    res.redirect('/login');
  } catch (e) {
    res.redirect('/register');
  }
});

// Logout Route
app.get('/logout', checkAuthenticated, (req, res) => {
  req.logOut();
  res.redirect('/login');
});

// Check Authenticated
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}

app.listen(process.env.PORT, () =>
  console.log(`Server Up and running @ port: ${process.env.PORT}`)
);
