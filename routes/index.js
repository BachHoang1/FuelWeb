const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const Client = require('../models/client');
const express = require('express');
const router = express.Router();

passport.use(new LocalStrategy(Client.authenticate()));
passport.serializeUser(Client.serializeUser());
passport.deserializeUser(Client.deserializeUser());      

router.get("/", (req, res) => { res.render('landing'); });

router.get("/login", (req, res) => { 
    message = { type: 'null' };
    res.render('login', message); 
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/clients/home",
    failureRedirect: "/login"
}));

router.get("/register", (req, res) => { 
    message = { type: 'null' };
    res.render('register', message); 
});

router.post("/register", (req, res) => {
    let newClient = new Client({ 
        newAcc: true,
        username: req.body.registerusername,
        dateCreated: Date()
    });
    
    if (req.body.registerpassword === req.body.confirmpassword) {
        Client.register(newClient, req.body.registerpassword, (err, client) => {
            if (err) {
                console.log(err);
                message = { 
                    type: 'error',
                    messageHeader: 'An error has occurred.',
                    messageBody: err.message + '.'
                }
                return res.render('register', message);
            }
            passport.authenticate("local", (_err, client) => {
                if (_err) {
                    console.log(_err);
                    message = { 
                        type: 'error',
                        messageHeader: 'An error has occurred.',
                        messageBody: _err.message + '.'
                    }
                    res.render('register', message);
                }
            });
            message = {
                type: 'warning',
                messageHeader: 'You have successfully registered!',
                messageBody: 'You need to log in to complete your registration.'
            } 
            res.render('login', message);
        });
    } else {
        message = {
            type: 'error',
            messageHeader: 'An error has occurred.',
            messageBody: 'The passwords do not match!' 
        }
        res.render('register', message);
    }
});

module.exports = router;