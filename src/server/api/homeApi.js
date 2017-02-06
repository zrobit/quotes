const express = require('express');
const router = express.Router();

const Quote = require('../models/quote');

router.get('/', function(req, res, next){
  Quote
  .find({}).limit(10).sort({'createdAt':-1})
  .select('slug content author tags')
  .populate('tags', 'name slug -_id')
  .populate('author', 'name slug')
  .exec((err, data) => {
    if (err) throw err;
    let context = {
      quotes: data
    };
    res.json(context)
  })
});

module.exports = router;
