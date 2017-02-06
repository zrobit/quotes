const express = require('express');
const router = express.Router();

const Quote = require('../models/quote');
const Author = require('../models/author');

router.get('/', function(req, res, next){
  let query = Author.find({}).select('_id name slug bio')

  query.exec((err, data)=>{
    if (err) throw err;
    res.json(data)
  })
});

router.get('/:slug', function(req, res, next){

  Author
  .findOne({slug:req.params.slug})
  .select('name slug bio')
  .populate({
      path: 'quotes',
      select: 'author content tags -_id',
      populate: {
        path: 'tags',
        select: "slug name -_id"
      }
    }
  )
  .exec((err, data) => {
    if (err) throw err;
    let context = {
      author: data
    }
    res.json(context)
  })
});

router.put('/:id', function(req, res, next){
  let { id } = req.params
  let { key, value } = req.body

  Author.findByIdAndUpdate(id, { $set: { key: key, value: value}}, function (err, author) {
    if (err) throw err;

    res.status(200).json({status: "ok"})
  });

  query.exec((err, author) => {
    let quote = Quote.find({author: author._id}).select('slug content')
    quote.exec((err, data) => {
      let object = Object.assign({type: 'authorModel'}, {author: author}, {quotes: data})
      if (err) throw err;
      res.json(object)
    })
  })
});

module.exports = router;
