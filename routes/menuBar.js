
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET Game page. */
router.get('/game', function(req, res, next) {
  res.render('GameOverview');
});

module.exports = router;
