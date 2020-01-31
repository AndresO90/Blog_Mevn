const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

// Create the Post Schema

const PostSchema = new Schema({
    author: { type: String, require: true },
    userName: { type: String, require: true },
    image:{ type: String, require: true },
    title: { type: String, require: true },
    text: { type: String, require: true },
    comments : { type:Array },
    views: { type : Number, default: 0 },
    likes: { type : Number, default: 0 },
    likeOwner: { type: Array },
    date: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Posts', PostSchema);