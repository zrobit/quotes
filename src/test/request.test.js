import test from 'ava';
import mongoose from 'mongoose';

import request from 'supertest';
import app from '../server';
import {Author, Quote, Tag} from '../server/models';
import {cicle} from '../utils';
import {fakeAuthors, fakeQuotes, fakeTags} from '../utils/data';

test.before('Loading Fake Data', async () => {
  // This runs after the above, but before tests
  const authors = fakeAuthors(10);
  const quotes = fakeQuotes(20);
  const tags = fakeTags(10);

  const itTags = cicle(await Tag.create(tags));
  const itAuthor = cicle(await Author.create(authors));
  const itQuotes = await Quote.create(quotes);

  itQuotes.forEach(async quote => {
    quote.author = itAuthor.next().id;
    quote.tags = [itTags.next().id, itTags.next().id, itTags.next().id];
    await quote.save();
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
