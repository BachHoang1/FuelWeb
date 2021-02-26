const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.render('login.ejs', { title: 'Login' });
});

app.get('/register', (req, res) => {
  res.render('register.ejs', { title: 'Register' });
});

app.get('/profile', (req, res) => {
  res.render('profile.ejs', { title: 'Profile' });
});

app.get('/quote', (req, res) => {
  res.render('quote.ejs', { title: 'Quote' });
});

app.get('/quotehistory', (req, res) => {
  res.render('quotehistory.ejs', { title: 'Quote History' });
});

app.listen(port, function (error) {
  if (error) {
    console.log('went wrong', error);
  } else {
    console.log('server is good ' + port);
  }
});
