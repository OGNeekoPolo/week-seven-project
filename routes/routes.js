const express = require('express');
const bodyParser = require('body-parser');
const statTracker = require('../models/schema');
// const passport = require('passport');

const router = express.Router();


router.use(bodyParser.urlencoded({extended: true}));


router.get('/', function(req, res){
  res.redirect('/activities');
});

router.get('/activities', function(req, res){
  statTracker.find().then(function(stats){
    // console.log(stats);
    res.render('index', {stats: stats});
  });
});

router.post('/activities', function(req, res){
  let entry = new statTracker({
    order: req.body.order,
    date: req.body.date,
    orderAmount: req.body.orderAmount
  });
  entry.save().then(function(){
    res.redirect('/activities');
  });
});

router.post('/update', function(req, res){
  statTracker.updateOne({
    _id: req.body.update
  }, {
    $set: {
      order: req.body.newName,
      orderAmount: req.body.newAmount
    }
  }).then(function(){
    res.redirect('/');
  });
});

router.post('/delete', function(req, res){
  statTracker.deleteOne({_id: req.body.delete}, function(){
    res.redirect('/');
  });
});

router.get('/activities/:id', function(req, res){
  let id = req.params.id;
  statTracker.findOne({_id: id}).then(function(stats){
    console.log(stats);
    res.render('order', {stats: stats});
  });
});

module.exports = router;
