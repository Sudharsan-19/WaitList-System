var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//Creating user model
userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    cpassword: String,
}),
Userdb = mongoose.model('userdb', userSchema);

module.exports = Userdb;