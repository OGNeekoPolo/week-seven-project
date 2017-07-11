const mongoose = require('mongoose');

const statTracker = new mongoose.Schema({
  order: {type: String, required: true},
  date: {type: Date, required: true},
  orderAmount: {type: Number, required: true}
});

const tracker = mongoose.model('tracker', statTracker);

module.exports = tracker;
