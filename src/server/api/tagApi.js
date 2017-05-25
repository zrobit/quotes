const express = require('express');
const router = express.Router();

const slug = require('slugg')

const Tag = require('../models/tag');

router.get('/', function(req, res, next){
  Tag
    .find().limit(10).sort({'recurrence':-1})
    .select('slug name recurrence')
    .exec((err, tags) => {
      if (err) throw err;
      res.json(tags)
    })
});

module.exports = router;
