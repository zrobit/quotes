const gulp = require('gulp');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/dot-quotes');

const Author = require('../src/server/models/author');
const Quote = require('../src/server/models/quote');
const Tag = require('../src/server/models/tag');
const User = require('../src/server/models/user');

const cicle = require('../src/utils').cicle;
const fakeAuthors = require('../src/utils/data').fakeAuthors;
const fakeQuotes = require('../src/utils/data').fakeQuotes;
const fakeTags = require('../src/utils/data').fakeTags;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

gulp.task('connectDB', cb => {
  db.once('open', () => {
    console.log('========== Database is Ready =======');
    cb();
  });
});

gulp.task('seed:quotes', ['connectDB'], () => {
  const authors = fakeAuthors(10);
  const it = cicle(authors);
  const quotes = fakeQuotes(20);
  const tags = fakeTags(10);

  Tag.create(tags, (err, tags) => {
    if (err) {
      throw err;
    }
    const itTags = cicle(tags);
    quotes.forEach(element => {
      Author.create(it.next(), (err, author) => {
        if (err) {
          throw err;
        }
        element.author = author.id;
        Quote.create(element, (err, quote) => {
          if (err) {
            throw err;
          }
          for (let i = 0; i < 3; i++) {
            quote.tags.push(itTags.next());
          }
          quote.save((err, finalData) => {
            if (err) {
              throw err;
            }
            console.log(finalData);
          });
        });
      });
    });
  });
});

gulp.task('seed:authors', ['connectDB'], () => {
  console.log('Updating authors...');
  const authors = fakeAuthors(20);
  Author.create(authors, (err, data) => {
    if (err) {
      throw err;
    }
    const object = JSON.stringify(data, null, 2);
    console.log(object);
    console.log('========= Authors have been updated  =====');
  });
});

gulp.task('seed:tags', ['connectDB'], () => {
  console.log('Updating tags...');
  const tags = fakeTags(50);
  Tag.create(tags, (err, data) => {
    if (err) {
      throw err;
    }
    const object = JSON.stringify(data, null, 2);
    console.log(object);
    console.log('========= Tags have been updated  =====');
  });
});

gulp.task('seed:users', ['connectDB'], () => {
  console.log('Updating user...');
  const user = {
    email: 'a@a.com',
    name: 'Luis Garcia',
    password: 'holahola',
    profile: {
      description: 'Hola esto es una description',
      avatar: '/assets/media/images/avatar.png'
    }
  };
  User.create(user, (err, data) => {
    if (err) {
      throw err;
    }
    const object = JSON.stringify(data, null, 2);
    console.log(object);
    console.log('========= User have been updated  =====');
  });
});

// Implementar interactive para estar seguros si queremos eleminar
// Eliminar Collections
gulp.task('seed:tag:clear', ['connectDB'], () => {
  Tag.remove({}, err => {
    if (err) {
      throw err;
    }
    console.log('collection Tag removed');
  });
});

gulp.task('seed:author:clear', ['connectDB'], () => {
  Author.remove({}, err => {
    if (err) {
      throw err;
    }
    console.log('collection Author removed');
  });
});

gulp.task('seed:quote:clear', ['connectDB'], () => {
  Quote.remove({}, err => {
    if (err) {
      throw err;
    }
    console.log('collection Quote removed');
  });
});

gulp.task('seed:user:clear', ['connectDB'], () => {
  User.remove({}, err => {
    if (err) {
      throw err;
    }
    console.log('collection User removed');
  });
});
