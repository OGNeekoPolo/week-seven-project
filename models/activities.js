const mongoose = require('mongoose');

const statTracker = new mongoose.Schema({
   order: {type: String, required: true},
   date: {type: Date, required: true},
   details: [{
    orderAmount: Number,
    orderPerson: String,
  }]
 });

const tracker = mongoose.model('tracker', statTracker);

module.exports = tracker;
