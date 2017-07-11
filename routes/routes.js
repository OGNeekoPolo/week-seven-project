const express = require('express');
const bodyParser = require('body-parser');
const statTracker = require('../models/schema');
const passport = require('passport');

const router = express.Router();


router.use(bodyParser.urlencoded({extended: true}));


router.get('/', function(req, res){
  res.redirect('/activities');
});

router.get('/activities', function(req, res){
  statTracker.find().then(function(stats){
    res.render('index', {stats: stats});
  });
});

router.post('/login',
  passport.authenticate('local'),
  function(req, res){
    res.redirect('/' + req.user.username);
  });

module.exports = router;
