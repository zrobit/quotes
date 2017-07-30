const fs = require('fs');
const readline = require('readline');
const Stream = require('stream');
const slug = require('slugg');
const gulp = require('gulp');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/fraseary-local-copy');
// #mongoose.set('debug', true);

const Author = require('../src/server/models/author');
const Quote = require('../src/server/models/quote');
const Meta = require('../src/server/models/meta');
const Tag = require('../src/server/models/tag');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

gulp.task('connectDB', cb => {
  db.once('open', () => {
    console.log('========== Database is Ready =======');
    cb();
  });
});

gulp.task('populate:quotes', ['connectDB'], () => {
  console.log('Updating quotes...');
  const instream = fs.createReadStream('../data/quotes.alfa.txt');
  const outstream = new Stream();
  const rl = readline.createInterface(instream, outstream);
  rl.on('line', line => {
    // Process line here
    line = line.trim();

    if (line === '') {
      return;
    }
    const quoteSlug = slug(line);

    Meta.findOne({slug: quoteSlug}, (err, data) => {
      if (err) {
        throw err;
      }
      if (!data) {
        Quote.create({content: line}, (err, quote) => {
          if (err) {
            throw err;
          }
          Meta.create({slug: quoteSlug, quote: quote.id}, (err, meta) => {
            if (err) {
              throw err;
            }
            console.log(meta);
          });
        });
      }
    });
  });

  rl.on('close', () => {
    // Do something on finish here
    console.log('Close file');
  });
});

gulp.task('populate:authors', ['connectDB'], () => {
  console.log('Updating authors...');
  const instream = fs.createReadStream('../data/authors.alfa.txt');
  const outstream = new Stream();
  const rl = readline.createInterface(instream, outstream);
  rl.on('line', line => {
    // Process line here
    line = line.trim();

    if (line === '') {
      return;
    }
    Author.getOrCreate({name: line}, (err, data) => {
      if (err) {
        throw err;
      }
      const object = JSON.stringify(data, null, 2);
      console.log(object);
    });
  });

  rl.on('close', () => {
    // Do something on finish here
    console.log('Close file');
  });
});

gulp.task('populate:tags', ['connectDB'], () => {
  console.log('Updating tags...');
  const instream = fs.createReadStream('../data/tags.alfa.txt');
  const outstream = new Stream();
  const rl = readline.createInterface(instream, outstream);
  rl.on('line', line => {
    // Process line here
    line = line.trim();

    if (line === '') {
      return;
    }

    Tag.getOrCreate({name: line}, (err, data) => {
      if (err) {
        throw err;
      }
      const object = JSON.stringify(data, null, 2);
      console.log(object);
    });
  });

  rl.on('close', () => {
    // Do something on finish here
    console.log('Close file');
  });
});

gulp.task('populate:joins', ['connectDB'], () => {
  console.log('Updating joins...');
  const instream = fs.createReadStream('../data/__quotes__.json');
  const outstream = new Stream();
  const rl = readline.createInterface(instream, outstream);
  rl.on('line', line => {
    // Process line here
    line = line.trim();
    if (line === '' || line === '[' || line === ']') {
      return;
    }
    if (line.slice(-1) === ',') {
      line = line.slice(0, -1);
    }
    line = JSON.parse(line);
    const quoteSlug = slug(line.content);
    const authorSlug = slug(line.author);
    const tagSlug = slug(line.category);

    Meta.findOne({slug: quoteSlug}, (err, meta) => {
      if (err) {
        throw err;
      }
      if (!meta) {
        return;
      }
      Quote.findOne({_id: meta.quote}, (err, quote) => {
        if (!quote.author) {
          Author.findOne({slug: authorSlug}, (err, author) => {
            if (err) {
              throw err;
            }
            if (author === null) {
              console.log(line.author);
            }
            quote.author = author.id;
            quote.save();
            console.log('quotes+ author:' + quote);
          });
        }

        Tag.findOne({slug: tagSlug}, (err, tag) => {
          if (err) {
            throw err;
          }
          quote.tags.addToSet(tag.id);
          quote.save();
          console.log('quotes+ tags:' + quote);
        });
      });
    });
  });

  rl.on('close', () => {
    // Do something on finish here
    console.log('Close file');
  });
});

gulp.task('populate:tags:recurrence', ['connectDB'], () => {
  console.log('Updating tags...');
  Tag.find({}, (err, tags) => {
    if (err) {
      throw err;
    }
    tags.forEach(tag => {
      Quote.count({tags: tag.id}, (err, count) => {
        if (err) {
          throw err;
        }
        Tag.findOneAndUpdate({_id: tag.id}, {recurrence: count}, (err, data) => {
          if (err) {
            throw err;
          }
          console.log(data.name + ' num: ' + count);
        });
      });
    });
  });
});

gulp.task('populate:meta:quote', ['connectDB'], async () => {
  console.log('Updating Quotes Meta...');
  const quotes = await Quote.find({}).exec();
  await quotes.forEach(async quote => {
    let tags = await Tag.find({_id: {$in: quote.tags}}).exec();
    const author = await Author.findOne({_id: quote.author}).exec();

    tags = tags.map(tag => tag.name);
    tags = tags.join(' ');

    const len = author.name.length + tags.length;

    const ranges = [0, 25, 28, 30, 33, 34, 36, 37];

    const str = [
      'Frase Célebre de ', // 16
      'Frase Célebre ', // 13
      'Palabras de ', // 11
      'Frase de ', // 8
      'Cita de ', // 7
      'Frase ', // 5
      'Cita ' // 4
    ];
    let fragment;

    if (len > ranges[0] && len <= ranges[1]) {
      fragment = str[0];
    } else if (len > ranges[1] && len <= ranges[2]) {
      fragment = str[1];
    } else if (len > ranges[2] && len <= ranges[3]) {
      fragment = str[2];
    } else if (len > ranges[3] && len <= ranges[4]) {
      fragment = str[3];
    } else if (len > ranges[4] && len <= ranges[5]) {
      fragment = str[4];
    } else if (len > ranges[5] && len <= ranges[6]) {
      fragment = str[5];
    } else if (len > ranges[6] && len <= ranges[7]) {
      fragment = str[6];
    } else {
      fragment = '';
    }
    const title = `${fragment}${author.name} sobre ${tags} | Fraseary`;
    const frase = quote.content;
    let _quote;

    if (frase.length > 120) {
      _quote = frase.substring(0, 120).split(' ').slice(0, -1).join(' ') + '...';
    } else {
      _quote = frase;
    }

    const description = `Frase de ${author.name}: ${_quote}`;

    const ogTitle = `${fragment}${author.name} sobre ${tags}`;
    const ogDescription = `${_quote} - ${author.name}`;
    const titleLen = title.length;
    console.log(`${titleLen}:${title}`);

    quote.meta = {
      title,
      description,
      og: {
        title: ogTitle,
        description: ogDescription
      }
    };
    quote.save();
  });
});

gulp.task('populate:meta:author', ['connectDB'], async () => {
  console.log('Updating Authors Meta...');
  const authors = await Author.find({}).exec();
  await authors.forEach(async author => {
    const title = `Frases de ${author.name} | Fraseary`;
    const description = `Frases célebres palabras famosas citas de ${author.name}`;
    author.meta = {
      title,
      description,
      og: {
        title,
        description
      }
    };
    await author.save();
    console.log(author.name);
  });
});
