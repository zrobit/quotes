const express = require('express');
const router = express.Router();

const slug = require('slugg')

const Tag = require('../models/tag');

router.get('/', function(req, res, next){
  Tag
    .find().limit(10).sort({'createdAt':-1})
    .select('slug name')
    .exec((err, tags) => {
      if (err) throw err;
      res.json(tags)
    })
});

module.exports = router;
