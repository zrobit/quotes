const express = require('express');

const router = new express.Router();

const Tag = require('../models/tag');

router.get('/', (req, res) => {
  Tag
    .find().limit(10).sort({recurrence: -1})
    .select('slug name recurrence')
    .exec((err, tags) => {
      if (err) {
        throw err;
      }
      res.json(tags);
    });
});

module.exports = router;
