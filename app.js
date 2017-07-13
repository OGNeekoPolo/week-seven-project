const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Router = require('./routes/routes');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();


app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(express.static('/'));

app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));


app.use('/', Router);



mongoose.connect('mongodb://localhost:27017/statistics');


app.listen(8000, function(){
  console.log('Uploading Stat Tracker...');
});
