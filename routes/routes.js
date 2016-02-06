var express = require('express');
var router = express.Router();


module.exports = function(passport) {

    /* GET home page. */
    router.get('/', function(req, res, next) {
      res.render('index');
    });

    router.get('/rules', function(req, res, next) {
        res.render('rules');
    });

    router.get('/contact', function(req, res, next) {
        res.render('contact');
    });

    // User login and registration routes.
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/',
        failureFlash: true
    }));

    router.get('/createUser', function(req, res, next) {
        res.render('createUser');
    });

    router.post('/createUser', passport.authenticate('signup', {
        successRedirect: 'welcomeNew',
        failureRedirect: 'createUser',
        failureFlash: true
    }));

    router.get('/logout', function(req, res) {
        req.logout();  //passport builtin to logout
        res.redirect('/');
    });

    return router;
}
