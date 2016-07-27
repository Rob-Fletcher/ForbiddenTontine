var express = require('express');
var router = express.Router();


module.exports = function(passport) {

    /* GET home page. */
    router.get('/', function(req, res, next) {
      res.render('index', {user: req.user});
    });

    router.get('/rules', function(req, res, next) {
        res.render('rules', {user: req.user});
    });

    router.get('/news', function(req, res, next) {
        res.render('news', {user: req.user});
    });

    router.get('/contact', function(req, res, next) {
        res.render('contact', {user: req.user});
    });

    // User login and registration routes.
    router.get('/welcomeNew', function(req, res, next){
        res.render('welcomeNew', {user: req.user});
    });

    router.get('/login', function(req, res, next) {
        res.render('login', {message: req.flash('message')});
    });

    router.post('/login', passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

    router.get('/createUser', function(req, res, next) {
        res.render('createUser', {message: req.flash('message')});
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
