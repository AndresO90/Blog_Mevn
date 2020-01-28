const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

// Create the Post Schema

const CommentSchema = new Schema({
    userName: {type: String, require: true },
    email: {type: String, require: true }, // To generate random avatar with gravatar
    gravatar: {type:String},
    text: {type: String, require: true },
    date: {type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', CommentSchema);