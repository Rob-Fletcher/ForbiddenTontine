var express = require('express');
var router = express.Router();

router.get('/createGame', function(req, res, next){
    res.render('createGame', {user: req.user});
});

module.exports = router;
