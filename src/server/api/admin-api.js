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
const {validateId} = require('../../utils');

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

router.put('/quotes/:id', updateQuotes);
function updateQuotes(req, res) {
  const id = req.body.id;
  let tags = req.body.tags;
  tags = tags
    .filter(tagId => validateId(tagId))
    .map(tagId => ({_id: tagId}));

  Quote.findById(id, (err, quote) => {
    if (err) {
      throw err;
    }
    quote.tags = tags;
    quote.save((err, quote) => {
      if (err) {
        throw err;
      }
      res.json(quote);
    });
  });
}

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
  const q = req.query.q || '';
  const name = new RegExp('^' + q);
  const {start, end, sort} = reduceUrlQuery(req);

  Promise.all([
    Tag.count().exec(),
    Tag.find({name}).limit(end - start).sort(sort).skip(start).exec()
  ]).then(([count, tags]) => {
    res.header('X-Total-Count', count);
    if (tags.length === 0) {
      return res.status(404).json({status: 404, message: 'Not found'});
    }
    res.json(tags);
  });
});

router.get('/tags/:id', (req, res) => {
  const id = req.params.id;
  if (!validateId(id)) {
    return res.status(404).json({status: 404, message: 'Not found'});
  }
  getTagByIdAdmin(req.params.id).then(data => {
    if (!data) {
      return res.status(404).json({status: 404, message: 'Not found'});
    }
    res.json(data);
  });
});

module.exports = router;
