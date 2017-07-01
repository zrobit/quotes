import test from 'ava';
import mongoose from 'mongoose';

import request from 'supertest';
import app from '../server';
import {Author, Quote, Tag} from '../server/models';
import {cicle} from '../utils';
import {fakeAuthors, fakeQuotes, fakeTags} from '../utils/data';

test.before('Loading Fake Data', async t => {
  // This runs after the above, but before tests
  const authors = fakeAuthors(10);
  const it = cicle(authors);
  const quotes = fakeQuotes(20);
  const tags = fakeTags(10);

  await Tag.create(tags, function(err, tags){
    if(err) throw err;
    let itTags = cicle(tags);
    quotes.forEach((element) => {
      Author.create(it.next(), (err, author)=> {
        if (err) throw err;
        element.author = author.id
        Quote.create(element, (err, quote) => {
          if (err) throw err;
          for(let i = 0; i < 3; i++){
            quote.tags.push(itTags.next());
          }
          quote.save(function(err, finalData){
            console.log(`Quote.slug: ${finalData.slug}`);
          });
        });
      });
    });
  });
});

test.after('cleanup data base', async t => {
  await mongoose.connection.db.dropDatabase();
  t.pass();
});

test('get:home', async t => {
  const res = await request(app).get('/');

  t.is(res.status, 200);
  t.is(res.statusCode, 200);

  t.false(res.serverError);
  t.false(res.notFound);
  t.false(res.clientError);
});

test('get:quote:detail', async t => {
  const quote = await Quote.findOne().exec();
  console.log(`Quote.slug: ${quote.slug}`);
  const res = await request(app).get(`/frase/${quote.slug}`);

  t.is(res.status, 200);
  t.is(res.statusCode, 200);

  t.false(res.serverError);
  t.false(res.notFound);
  t.false(res.clientError);
});

test('get:quote:undefined:detail', async t => {
  const res = await request(app).get('/frase/undefined-slug');
  t.is(res.status, 404);
  t.is(res.statusCode, 404);

  t.false(res.serverError);

  t.true(res.notFound);
  t.true(res.clientError);
});

test('get:author:detail', async t => {
  const author = await Author.findOne().exec();
  console.log(`Author.slug: ${author.slug}`);
  const res = await request(app).get(`/autor/${author.slug}`);

  t.is(res.status, 200);
  t.is(res.statusCode, 200);

  t.false(res.serverError);
  t.false(res.notFound);
  t.false(res.clientError);
});

test('get:author:undefined:detail', async t => {
  const res = await request(app).get('/autor/undefined-author');
  t.is(res.status, 404);
  t.is(res.statusCode, 404);

  t.false(res.serverError);

  t.true(res.notFound);
  t.true(res.clientError);
});
