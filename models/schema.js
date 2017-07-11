const mongoose = require('mongoose');

const statTracker = new mongoose.Schema({
  activity: {type: String, required: true},
  universe: {type: String, required: true},
  writer: {type: String, required: true},
  artist: {type: String, required: true},
  issue: [{
    volume: {type: Number, required: true, unique: true},
    edition: Number,
  }]
});

const stats = mongoose.model('stats', statTracker);

module.exports = stats;
