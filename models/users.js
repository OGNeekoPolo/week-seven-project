const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const appUsers = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
 });

appUsers.pre('save', function(next){
  let user = this;
  if (!user.isModified('password'))
    return next();
    bcrypt.genSalt(saltRounds, function(err, salt){
      bcrypt.hash(user.password, salt, function(err, hash){
        user.password = hash;
        next();
      });
    });
});

const users = mongoose.model('users', appUsers);

module.exports = users;
