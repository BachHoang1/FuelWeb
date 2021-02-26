const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const app = express()
const port = 3000

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))


app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.redirect("/login")
  })

app.get('/login', (req, res) => {
    res.render("login.ejs", { title: "Login PAGE" })
  })

app.get('/register', (req, res) => {
    res.render("register.ejs", { title: "Register PAGE" })
  })

  app.get('/profile', (req, res) => {
    res.render("profile.ejs", { title: "Login PAGE" })
  })

app.get('/form', (req, res) => {
    res.render("form.ejs", { title: "Register PAGE" })
  })

  app.get('/result', (req, res) => {
    res.render("result.ejs", { title: "Login PAGE" })
  })


app.listen(port, function(error){
    if (error){
        console.log('went wrong',error)
    } else {
        console.log('server is good ' + port)
    }
})