const express = require('express');
const Author = require('../models/author');
const {getAuthorBy} = require('../queries/author-query');

const router = new express.Router();

router.get('/', (req, res) => {
  const query = Author.find({}).select('_id name slug bio');

  query.exec((err, data) => {
    if (err) {
      throw err;
    }
    res.json(data);
  });
});

router.get('/:slug', (req, res) => {
  getAuthorBy({slug: req.params.slug}).then(author => {
    res.json({author});
  });
});

router.put('/:id', (req, res) => {
  const {id} = req.params;
  const {key, value} = req.body;

  Author.findByIdAndUpdate(id, {$set: {key, value}}, err => {
    if (err) {
      throw err;
    }
    res.status(200).json({status: 'ok'});
  });
});

module.exports = router;
