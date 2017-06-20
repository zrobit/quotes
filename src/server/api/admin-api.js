const express = require('express');
const {
  Quote,
  getQuoteByIdAdmin
} = require('../queries/quote-query');

const {
  Author,
  getAuthorByIdAdmin
} = require('../queries/author-query');

const {
  Tag,
  getTagByIdAdmin
} = require('../queries/tag-query');

const router = new express.Router();

// Helper function
const reduceUrlQuery = req => {
  const start = parseInt(req.query._start, 10) || 0;
  const end = parseInt(req.query._end, 10) || 9;
  const {_sort, _order} = req.query;
  const sort = _order === 'ASC' ? _sort : '-' + _sort;
  return {start, end, sort};
};

// #api/admin/quotes
router.get('/quotes', (req, res) => {
  const {start, end, sort} = reduceUrlQuery(req);
  Promise.all([
    Quote.count().exec(),
    Quote.find().limit(end - start).sort(sort).skip(start).exec()
  ]).then(([count, quotes]) => {
    res.header('X-Total-Count', count);
    res.json(quotes);
  });
});

router.get('/quotes/:id', (req, res) => {
  getQuoteByIdAdmin(req.params.id).then(data => {
    res.json(data);
  });
});

// #api/admin/authors
router.get('/authors', (req, res) => {
  const {start, end, sort} = reduceUrlQuery(req);
  Promise.all([
    Author.count().exec(),
    Author.find().limit(end - start).sort(sort).skip(start).exec()
  ]).then(([count, authors]) => {
    res.header('X-Total-Count', count);
    res.json(authors);
  });
});

router.get('/authors/:id', (req, res) => {
  getAuthorByIdAdmin(req.params.id).then(data => {
    res.json(data);
  });
});

// #api/admin/tags
router.get('/tags', (req, res) => {
  const {start, end, sort} = reduceUrlQuery(req);
  Promise.all([
    Tag.count().exec(),
    Tag.find().limit(end - start).sort(sort).skip(start).exec()
  ]).then(([count, tags]) => {
    res.header('X-Total-Count', count);
    res.json(tags);
  });
});

router.get('/tags/:id', (req, res) => {
  getTagByIdAdmin(req.params.id).then(data => {
    res.json(data);
  });
});

module.exports = router;
