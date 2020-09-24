const mongoose = require('mongoose');

const botSchema = new mongoose.Schema({
    userID: String,
    money: String
})

module.exports = mongoose.model('botSchema', botSchema)