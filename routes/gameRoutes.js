var express = require('express');
var router = express.Router();

// Create a new game
router.get('/createGame', function(req, res, next){
    res.render('gameViews/createGame', {user: req.user});
});
router.post('/createGame', function(req, res, next){
    // need to register the game here.
    res.render('gameViews/gameOverview', {user: req.user})
});

// Main game status page. This will show the swimlane chart
router.get('/gameOverview', function(req, res, next){
    res.render('gameViews/gameOverview', {user: req.user})
});

module.exports = router;
