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

if (process.env.NODE_ENV === 'production') {
  mongoose.connect('mongodb://localhost/fraseary-production');
} else {
  mongoose.connect('mongodb://localhost/fraseary-local');
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
