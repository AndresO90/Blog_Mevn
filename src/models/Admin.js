const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

// Create the User Schema

const AdminSchema = new Schema({
    name: { type: String, require: true },
    userName: { type: String, require: true },
    email: { type: String, require: true},
    password: { type: String, require: true },
    date: { type: Date, default: Date.now },
    job_profile: { type: String, require: true }
});

module.exports = mongoose.model('Admin', AdminSchema);