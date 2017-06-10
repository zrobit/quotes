const express = require('express');
const words = require('lodash').words;
const slug = require('slugg');
const Quote = require('../models/quote');
const Author = require('../models/author');
const isPage = require('../middleware/isPage');

const router = new express.Router();

// #api/quotes
router.get('/', isPage, (req, res) => {
  const nPage = parseInt(req.query.page, 10);
  const nItems = 10;
  Quote.count({}, (err, count) => {
    if (err) {
      throw err;
    }
    const next = count > nItems * nPage ? nPage + 1 : null;
    const query = Quote.find({}).limit(10).sort({createdAt: -1});
    query.skip((nPage - 1) * nItems);
    query.select('slug content author tags size');
    query.populate('tags', 'name slug -_id');
    query.populate('author', 'name slug');
    query.exec((err, data) => {
      if (err) {
        throw err;
      }
      const context = {quotes: data, next};
      res.json(context);
    });
  });
});

// #api/quotes/author/:_id
router.get('/author/:id', isPage, (req, res) => {
  const nPage = parseInt(req.query.page, 10);
  const nItems = 10;
  Quote.count({author: req.params.id}, (err, count) => {
    if (err) {
      throw err;
    }
    const next = count > nItems * nPage ? nPage + 1 : null;
    const query = Quote.find({author: req.params.id}).limit(10).sort({createdAt: -1});

    query.skip((nPage - 1) * nItems);
    query.select('slug content author tags size');
    query.populate('tags', 'name slug -_id');
    query.populate('author', 'name slug hashId');
    query.exec((err, data) => {
      if (err) {
        throw err;
      }
      const context = {quotes: data, next};
      res.json(context);
    });
  });
});

// #api/quotes/:slug
router.get('/:slug', (req, res) => {
  const query = Quote.findOne({slug: req.params.slug});
  query.select('slug content author size');
  query.populate('author', 'name slug');
  query.exec((err, data) => {
    if (err) {
      throw err;
    }
    const context = {
      quote: data
    };
    res.json(context);
  });
});

router.post('/', (req, res) => {
  const author = new Author({name: req.body.author});
  const content = req.body.content;
  const contentSlug = slug(words(content).slice(0, 4).join(' '));

  author.save(err => {
    if (err) {
      throw err;
    }
    const quote = new Quote({
      content,
      author: author.id,
      slug: author.slug + '-' + contentSlug
    });

    quote.save(err => {
      if (err) {
        throw err;
      }
      res.status(200).json({status: 'ok'});
    });
  });
});

module.exports = router;
