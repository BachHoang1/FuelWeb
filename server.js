const express = require('express');
//const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;
const { ROLE } = require('./data')
const { authUser, authRole ,specificPath} = require('./basicAuth')
const projectRouter = require('./routes/projects')
const bodyParser = require('body-parser');
const session = require('express-session')
var path = require('path');

const SchemaUser = require("./models/User")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public')));
app.use('/projects', projectRouter)

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.render('login.ejs', { title: 'Login' });
});

app.post('/login', (req, res) => {
  console.log(req.session)
      SchemaUser.findOne({ username: userName, password: password }, function (err, docs) {
        if (err) {
          console.log(err);
          res.redirect(req.headers.referer)
        }
        if (docs !== null) {
          console.log("login success: here are the information about that account")
          console.log(docs)
          //set all those requirement
          req.session.userId = docs._id
          req.session.userName = docs.username
          req.session.userRole = docs.role
          req.session.userSpecific = docs.path

          for (eachRole in ROLE) {
            if (docs.role === ROLE[eachRole].Name) {
              req.session.userPath = ROLE[eachRole].path
            }
          }

          console.log("might be bug!: userpath from session:" + req.session.userPath)
          //THIS NEED TO RETURN SINCE IT WILL GO FURTHUR TO THE BELOW LINES
          return res.redirect(req.session.userPath)
        }

        //error or if no USER has found --> redirect to the page
        res.redirect(303, req.headers.referer + "?credential=invalid");
        // res.redirect(req.headers.referer,{title:"test"});

      })
    });

app.get('/register', (req, res) => {
  res.render('register.ejs', { title: 'Register' });
});

app.get("/logout", (req, res) => {
  req.session.userId = null
  req.session.userName = null
  req.session.userRole = null
  req.session.userPath = null
  req.session.userSpecific = null
  // console.log(req.session)
  res.redirect(303, '/login?logout=success')
})

app.get('/profile', (req, res) => {
  res.render('profile.ejs', { title: 'Profile' });
});

app.get('/quote', (req, res) => {
  res.render('quote.ejs', { title: 'Quote' });
});

app.get('/quotehistory', (req, res) => {
  res.render('quotehistory.ejs', { title: 'Quote History' });
});

/// RETRIEVE DATA
app.get('/get_user_data', (req, res) => {
  console.log("getting user data...")
  SchemaUser.find({}, function (err, docs) {
    if (err) {
      console.log(err);
      res.status(500)
      return res.send("ERROR when access to DB - try again")
    }
    if (docs.length > 0) {
      console.log(docs)
      res.send(docs)
    } else {
      res.send({})
    }
  })
})

app.delete('/delete_user/:id', (req, res) => {
  const { id } = req.params;
  SchemaUser.deleteOne({ _id: id }, function (err) {
    if (err) {
      console.log(err)
    }
  })
  res.send("ok")
})

app.listen(port, function (error) {
  if (error) {
    console.log('went wrong', error);
  } else {
    console.log('server is good ' + port);
  }
});
