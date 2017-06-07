//load hook for styles
require('./hook')

const express = require('express');

const passport = require('passport');
const flash    = require('connect-flash');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session      = require('express-session');

var router = require('./router')

require('./config/passport');

const app = express();


app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json()); // support json encoded bodies


// required for passport
app.use(session({
  secret: 'thesewordsareuniquedontcopyXD',
  resave: true,
  saveUninitialized: true
})); // session secret

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.locals = {pretty:true, cache:true, env: process.env}

app.use(router)

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')


module.exports = app;
