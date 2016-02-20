var express = require('express');
var router = express.Router();

router.get('/createGame', function(req, res, next){
    res.render('createGame', {user: req.user});
});

router.post('/createGame', function(req, res, next){
    var creator = require('../gameEngine/createGame');
});

module.exports = router;
