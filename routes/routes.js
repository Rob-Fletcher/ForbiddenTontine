var express = require('express');
var router = express.Router();

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

module.exports = router;
