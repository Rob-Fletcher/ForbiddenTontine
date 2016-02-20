var mongoose = require('mongoose');

var gameInfoSchema = mongoose.Schema({
    startTime: Date,
    endTime:   Date,
    playersInGame: [{
        status: String,
        user: {type: mongoose.Schema.ObjectID, ref: 'User'}
    }]
    events: [{
        target: mongoose.Schema.ObjectID,
        source: mongoose.Schema.ObjectID,
        eventTime: Date,
        eventType: String,
        image: String
    }]

});

module.exports = mongoose.model('GameInfo', gameInfoSchema);
