const express = require('express');

const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

mongoose.Promise = global.Promise;

if (process.env.DB_ENV === 'test') {
  console.log('####> Database Env: testing <####');
  if (process.env.DEV_ENV === 'ci') {
    console.log('####> Dev Env: gitlab CI <####');
    mongoose.connect('mongodb://mongo/fraseary-test', {useMongoClient: true});
  } else {
    console.log('####> Dev Env: Local <####');
    mongoose.connect('mongodb://localhost/fraseary-test', {useMongoClient: true});
  }
} else if (process.env.NODE_ENV === 'production') {
  mongoose.connect('mongodb://localhost/db-fr-prod-1', {useMongoClient: true});
} else {
  mongoose.connect('mongodb://localhost/fraseary-local-copy', {useMongoClient: true});
}

const router = require('./router');

app.locals = {pretty: true, cache: true, env: process.env};

require('./config/passport');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json()); // Support json encoded bodies

// required for passport
app.use(session({
  secret: 'thesewordsareuniquedontcopyXD',
  resave: true,
  saveUninitialized: true
})); // Session secret

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(router);

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// Database
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database is Ready');
  // We're connected!
});

module.exports.listen = app.listen(3000, () => {
  console.log('Server is Ready');
});
