var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/dot-quotes');


var router = require('./router')


app.locals = {pretty:true, cache:true}


app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json()); // support json encoded bodies

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
