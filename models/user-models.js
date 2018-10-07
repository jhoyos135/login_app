/*=====
This file is the schema used to store the information in mongodb database then is imported to passport setup which is included in the main app.js file
=====*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    username: String,
    googleId: String,
    thumbnail: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;