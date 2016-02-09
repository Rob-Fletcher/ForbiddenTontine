var mongoose = require('mongoose');

module.exports = mongoose.model('GameInfo', {
    startTime: Date,
    endTime:   Date,
    players: [{
        _id: Number,
        status: String,
    }]
    events: [{
        target: Number,
        source: Number,
        eventTime: Date,
        eventType: String,
        image: imageFile
    }]

});
