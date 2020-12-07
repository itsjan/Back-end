var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ReactionSchema = new Schema({
    by: { type: Schema.ObjectId, ref: 'User', required: true },
    time : { type : Date, default: Date.now },
    reaction: {type: String, required: true, 
        enum:['NONE', 'LIKE', 'LOVE', 'WOW', 'HAHA', 'SORRY', 'ANGRY'], 
        default:'none'},

});

// @TODO .. timestamp 

module.exports = mongoose.model('Reaction', ReactionSchema );