const express = require('express');
const bodyParser = require('body-parser');
const statTracker = require('../models/activities');
const appUsers = require('../models/users');

const router = express.Router();



router.use(bodyParser.urlencoded({extended: true}));

let sess;


router.get('/', function(req, res) {
  sess = req.session;
  if (sess.username) {
    res.redirect('/activities');
  } else {
    res.render('register');
  }
});

router.post('/', function(req, res){
  sess = req.session;
  if (req.body.password !== req.body.confirm) {
    res.send('Your passwords do not match.');
  } else {
    let newUser = new appUsers({
      username: req.body.username,
      password: req.body.password
    });
    newUser.save().then(function(user){
      sess.username = user.username;
      sess.password = user.password;
      console.log(sess);
      res.redirect('/activities');
    });
  }
});

router.get('/login', function(req, res){
  sess = req.session;
  if (sess.username) {
    res.redirect('/activities');
  } else {
    res.render('login');
  }
});

router.post('/login', function(req, res){
  sess = req.session;
  appUsers.findOne({
    username: req.body.loginName,
  }, function(err, user){
      if (err) throw err;
      user.comparePassword(req.body.loginPassword, function(err, isMatch){
        if (err){
          throw err;
        } else if (isMatch) {
          sess.username = user.username;
          sess.password = user.password;
          // console.log(sess);
          // console.log('Password is a match', isMatch);
          res.redirect('/activities');
        }
      });
    });
  });


router.get('/activities', function(req, res) {
  sess = req.session;
  if (sess.username) {
    statTracker.find().then(function(stats) {
      res.render('index', {
        stats: stats
      });
    });
  } else {
    res.redirect('/');
  }
});

router.post('/activities', function(req, res) {
  let entry = new statTracker({
    order: req.body.order,
    date: req.body.date,
  });
  entry.save().then(function() {
    res.redirect('/activities');
  });
});

router.post('/update', function(req, res) {
  statTracker.updateOne({
    _id: req.body.update
  }, {
    $set: {
      order: req.body.newName,
    }
  }).then(function() {
    res.redirect('/');
  });
});

router.post('/delete', function(req, res) {
  statTracker.deleteOne({
    _id: req.body.delete
  }, function() {
    res.redirect('/');
  });
});

router.get('/activities/:id', function(req, res) {
  sess = req.session;
  if (sess.username) {
    let id = req.params.id;
    statTracker.findOne({
      _id: id
    }).then(function(stats) {
      // console.log(stats);
      res.render('order', {
        stats: stats
      });
    });
  } else {
    res.redirect('/');
  }
});

router.get('/activities/:id/details', function(req, res){
  sess = req.session;
  if (sess.username) {
    let id = req.params.id;
    statTracker.findOne({
      _id: id
    }).then(function(stats){
      res.json(stats);
      // res.render('details', {stats: stats});
    });
  } else {
    res.redirect('/');
  }
});

router.post('/activities/:id/details', function(req, res){
  let id = req.params.id;
  statTracker.findOne({
    _id: id
  }).then(function(stats){
    stats.details.push({
      orderAmount: req.body.orderAmount,
      orderPerson: req.body.orderPerson
    });
    stats.save().then(function(){
      res.redirect('/');
    });
  });
});

router.post('/detail_delete', function(req, res){
  statTracker.findOne({
    'details._id': req.body.deleteDetails
  }).then(function(stat){
    stat.details.splice(0, 3);
    stat.save().then(function(){
      res.redirect('/');
    });
  });
});

router.post('/logout', function(req, res){
  sess = req.session;
  sess.destroy(function(err){
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
