const express = require('express');
const words = require('lodash').words;
const slug = require('slugg');

const {getPagQuotes, getQuoteBy} = require('../queries/quote-query');
const Quote = require('../models/quote');
const Author = require('../models/author');
const isPage = require('../middleware/isPage');

const router = new express.Router();

// #api/quotes
router.get('/', isPage, (req, res) => {
  const nPage = parseInt(req.query.page, 10);
  const nItems = 10;
  getPagQuotes({}, nItems, nPage).then(data => {
    res.json(data);
  });
});

// #api/quotes/author/:_id
router.get('/author/:id', isPage, (req, res) => {
  const nPage = parseInt(req.query.page, 10);
  const nItems = 10;
  getPagQuotes({author: req.params.id}, nItems, nPage).then(data => {
    res.json(data);
  });
});

// #api/quotes/:slug
router.get('/:slug', (req, res) => {
  getQuoteBy({slug: req.params.slug}).then(quote => {
    res.json({quote});
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
