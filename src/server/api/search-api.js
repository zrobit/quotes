const express = require('express');
const Quote = require('../models/quote');

const router = new express.Router();

router.get('/', (req, res) => {
  const query = req.query.q;
  Quote
  .find({
    $text: {$search: query}
  })
  .limit(10).sort({createdAt: -1})
  .select('slug content author tags')
  .populate('tags', 'name slug -_id')
  .populate('author', 'name slug')
  .exec((err, data) => {
    if (err) {
      throw err;
    }
    const context = {
      quotes: data
    };
    res.json(context);
  });
});

module.exports = router;
