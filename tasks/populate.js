const gulp = require('gulp');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/fraseary-local');
// mongoose.set('debug', true);

const Author = require('../src/server/models/author');
const Quote = require('../src/server/models/quote');
const Meta = require('../src/server/models/meta');
const Tag = require('../src/server/models/tag');

var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

var slug = require('slugg');


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

gulp.task('connectDB', function(cb) {
  db.once('open', function() {
    console.log('========== Database is Ready =======')
    cb();
  });
});

gulp.task('populate:quotes', ['connectDB'], function(){
  console.log('Updating quotes...')
  var instream = fs.createReadStream('../data/quotes.alfa.txt');
  var outstream = new stream;
  var rl = readline.createInterface(instream, outstream);
  rl.on('line', function(line) {
    // process line here
    line = line.trim();

    if(line === ''){
      return;
    }
    let quoteSlug = slug(line)

    Meta.findOne({slug: quoteSlug}, (err, data) => {
        if (err) throw err;
        if(!data){
          Quote.create({content: line}, (err, quote) => {
            if (err) throw err;
            Meta.create({slug: quoteSlug, quote: quote.id}, (err, meta)=>{
              if (err) throw err;
              console.log(meta);
            })
          })
        }
      });
  });

  rl.on('close', function() {
    // do something on finish here
    console.log('Close file')
  });
});

gulp.task('populate:authors', ['connectDB'], function(){
  console.log('Updating authors...')
  var instream = fs.createReadStream('../data/authors.alfa.txt');
  var outstream = new stream;
  var rl = readline.createInterface(instream, outstream);
  rl.on('line', function(line) {
    // process line here
    line = line.trim();

    if(line === ''){
      return;
    }
    Author.getOrCreate({name: line}, function(err, data){
      if (err) throw err;
      let object = JSON.stringify(data, null, 2)
      console.log(object);
    });
  });

  rl.on('close', function() {
    // do something on finish here
    console.log('Close file')
  });
});

gulp.task('populate:tags', ['connectDB'], function(){
  console.log('Updating tags...')
  var instream = fs.createReadStream('../data/tags.alfa.txt');
  var outstream = new stream;
  var rl = readline.createInterface(instream, outstream);
  rl.on('line', function(line) {
    // process line here
    line = line.trim();

    if(line === ''){
      return;
    }

    Tag.getOrCreate({name: line}, function(err, data){
      if (err) throw err;
      let object = JSON.stringify(data, null, 2)
      console.log(object);
    });
  });

  rl.on('close', function() {
    // do something on finish here
    console.log('Close file')
  });
});


gulp.task('populate:joins', ['connectDB'], function(){
  console.log('Updating joins...')
  var instream = fs.createReadStream('../data/__quotes__.json');
  var outstream = new stream;
  var rl = readline.createInterface(instream, outstream);
  rl.on('line', function(line) {
    // process line here
    line = line.trim();
    if(line === ''|| line=== '[' || line===']'){
      return;
    }
    if(line.slice(-1)===','){
      line = line.slice(0, -1)
    }
    line = JSON.parse(line)
    let quoteSlug = slug(line.content);
    let authorSlug = slug(line.author);
    let tagSlug = slug(line.category);


    Meta.findOne({slug: quoteSlug}, (err, meta)=>{
      if(err) throw err;
      if(!meta) return;
      Quote.findOne({_id: meta.quote}, (err, quote)=>{
        if(!quote.author){
          Author.findOne({slug: authorSlug}, (err, author)=>{
            if(err) throw err;
            if(author===null){
              console.log(line.author)
            }
            quote.author = author.id;
            quote.save();
            console.log('quotes+ author:'+ quote)
          })
        }

        Tag.findOne({slug: tagSlug}, (err, tag)=>{

          if (err) throw err;
          quote.tags.addToSet(tag.id)
          quote.save()
          console.log('quotes+ tags:'+ quote)
        })
      })
    })
  });

  rl.on('close', function() {
    // do something on finish here
    console.log('Close file')
  });
});


gulp.task('populate:tags:recurrence', ['connectDB'], function(){
  console.log('Updating tags...')
  Tag.find({}, function(err, tags){
    if (err) throw err;
    tags.map(function(tag){
      Quote.count({'tags': tag.id}, function(err, count){
        if (err) throw err;
        Tag.findOneAndUpdate({_id:tag.id}, {recurrence:count},function(err, data){
          if (err) throw err;
          console.log(data.name + ' num: '+count)
        })

      })
    })
  })
});
