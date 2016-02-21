// logic to create a game and store it in the database
// TODO: Need to figure out what this should return. needs
//       to be able to return error status.
var Game = require('../data/models/gameInfo');
var User = require('../data/models/user');


var createGame = function(req, callback){
    //Check to see if the game name is taken.
    Game.findOne({'gameName': req.body.gameName}, function(err, game){
        if (err) {
            console.log("Error in create new game: " + err);
            return callback(err);

        }
        //already exists
        if (game) {
            console.log("Game already exists with name: " + req.body.gameName);
            return;
        } else {
            var newGame = new Game();
            var currentUser = findUser(req.user.username);
            if (!currentUser){
                var err = new Error("Could not find current user.");
                return callback(err);
            }

            newGame.gameName = req.body.gameName;
            newGame.gameMaster = currentUser._id;
            newGame.maxNPlayers = req.body.maxNumOfPlayers;
            newGame.startTime = startTime;
            newGame.endTime = endTime;
            newGame.playersInGame = [{status:'alive', user: currentUser._id}];
            newGame.events = [];

            newGame.save(function(err){
                if(err){
                    console.log("Error saving new game.");
                    return callback(err);
                }
                console.log("Successfully created a new game.")
                return callback(null);
            });

        }
    });

    newGame.gameName = req.body.gameName;
}

var findUser = function(userName){
    User.findOne({'username': userName}, function(err, user){
        if (err) {
            console.log("Error finding user: "+req.user.username);
            return null;
        }
        if (user) {
            return user;
        }
    });

}

module.exports = createGame;
