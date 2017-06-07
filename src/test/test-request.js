import test from 'ava';

import request from 'supertest'

import app from '../server'


test('get:home', async t => {
  const res = await request(app).get('/');

  t.is(res.status, 200);
  t.is(res.statusCode, 200);

  t.false(res.serverError);
  t.false(res.notFound);
  t.false(res.clientError);
});

test('get:quote:detail', async t => {
  const res = await request(app).get('/frase/util-es-todo-lo-que-nos-da');

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
  const res = await request(app).get('/autor/auguste-rodin');

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
