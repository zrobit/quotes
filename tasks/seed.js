const gulp = require('gulp');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/dot-quotes');


const fake = require('casual');
const Author = require('../src/server/models/author');
const Quote = require('../src/server/models/quote');

const cicle = require('../src/utils').cicle
const fakeAuthors = require('../src/utils/data').fakeAuthors
const fakeQuotes = require('../src/utils/data').fakeQuotes


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

gulp.task('connectDB', function(cb) {
  db.once('open', function() {
    console.log('========== Database is Ready =======')
    cb();
  });
});

gulp.task('seed:quotes', ['connectDB'], function(){
  let authors = fakeAuthors(10);
  let it = cicle(authors)

  // }
  // Author.create({})


  // Quote.
});

gulp.task('seed:author', ['connectDB'], function(){
  console.log('Updating authors...')
  let authors = fakeAuthors(20)
  Author.create(authors, function(err, data){
    if (err) throw err;
    let object = JSON.stringify(data, null, 2)
    console.log(object);
    console.log('========= Authors have been updated  =====')
  });
});

gulp.task('seed:author:clear', ['connectDB'], function(){
  //Todo implementar interactive para estar seguros si queremos eleminar

  Author.remove({}, function(err) {
    console.log('collection removed')
  });
})