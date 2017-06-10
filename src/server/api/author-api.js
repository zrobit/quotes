const express = require('express');
const Author = require('../models/author');

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
  Author
  .findOne({slug: req.params.slug})
  .select('name slug bio')
  .populate({
    path: 'quotes',
    select: 'author size slug content tags -_id',
    populate: {
      path: 'tags',
      select: 'slug name -_id'
    }
  })
  .exec((err, data) => {
    if (err) {
      throw err;
    }
    const context = {
      author: data
    };
    res.json(context);
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
