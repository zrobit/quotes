const express = require('express');
const {
  getQuotesAdmin,
  getQuoteByIdAdmin,
  countQuotes
} = require('../queries/quote-query');

const {
  getAuthorsAdmin,
  getAuthorByIdAdmin,
  countAuthors
} = require('../queries/author-query');

const router = new express.Router();

// #api/admin/quotes
router.get('/quotes', (req, res) => {
  const start = parseInt(req.query._start, 10) || 0;
  const end = parseInt(req.query._end, 10) || 9;

  Promise.all([
    countQuotes(),
    getQuotesAdmin({}, start, end)
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
  const start = parseInt(req.query._start, 10) || 0;
  const end = parseInt(req.query._end, 10) || 9;
  const {_sort, _order} = req.query;
  const sort = _order === 'ASC' ? _sort : '-' + _sort;
  Promise.all([
    countAuthors(),
    getAuthorsAdmin({}, start, end, sort)
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

module.exports = router;
