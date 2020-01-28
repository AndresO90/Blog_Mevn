const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const OffensiveWordsSchema = new Schema({
    word: {type: String, require: true },
    level: {type: Number, require: true }
});

module.exports = mongoose.model('OffensiveWords', OffensiveWordsSchema);