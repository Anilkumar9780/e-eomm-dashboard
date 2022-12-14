const mongoose = require('mongoose');

//user schema
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
});

module.exports = mongoose.model("users", userSchema);
