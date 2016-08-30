// Dependencies
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
// require the owner schema
require('./models/owner');
require('./models/message');
require('./models/dog');
require('./config/passport');

var routes = require('./routes/api');
// connect our database
// mongoose.connect("mongodb://puppy:love@ds145315.mlab.com:45315/heroku_44lg18lr" || 'mongodb://localhost/cbb');
mongoose.connect('mongodb://localhost/cbb');

// Espress
var app = express();

// let's use bodyParser() to get data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());
app.use(passport.initialize());
// Routes for our api:

// Register our routes -------------
// all of our routes will be prefixed with the /api
app.use('/api', routes);


// set the port for our server
var port = process.env.PORT || 3000;
app.set('port', port);


// Start server
app.listen(port, function(){
  console.log('Server is up and running');
});