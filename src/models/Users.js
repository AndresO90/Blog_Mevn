const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

// Create the User Schema

const UserSchema = new Schema({
    name: {type: String, require: true },
    userName: {type: String, require: true },
    email: {type: String, require: true},
    password: {type: String, require: true },
    date: {type: Date, default: Date.now },
    createdPosts: {type: Array}
});

module.exports = mongoose.model('Users', UserSchema);