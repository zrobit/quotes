const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const flash    = require('connect-flash');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session      = require('express-session');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/dot-quotes');


var router = require('./router')

require('./config/passport');

app.locals = {pretty:true, cache:true}

app.use(morgan('dev'))
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json()); // support json encoded bodies

// required for passport
app.use(session({
  secret: 'thesewordsareuniquedontcopyXD',
  resave: false,
  saveUninitialized: false
})); // session secret

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(router)

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

app.listen(3000, function () {
  console.log('Server is Ready');
});


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database is Ready')
  // we're connected!
});


