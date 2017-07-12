const mongoose = require('mongoose');

const Users = new mongoose.Schema({
  username: String,
  password: String
});

const users = mongoose.model('user', Users);

module.exports = users;
