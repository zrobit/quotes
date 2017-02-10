const express = require('express');
const router = express.Router();

const words = require('lodash').words
const slug = require('slugg')


const Quote = require('../models/quote');
const Author = require('../models/author');

router.get('/', function(req, res, next){
  let query = Quote.find({}).limit(10).sort({'createdAt':-1});
  query.select('slug content author tags size');
  query.populate('tags', 'name slug -_id');
  query.populate('author', 'name slug');
  query.exec((err, data) => {
    if (err) throw err;
    res.json(data)
  })
});

router.get('/:slug', function(req, res, next){
  let query = Quote.findOne({slug:req.params.slug})
  query.select('slug content author');
  query.populate('author', 'name slug -quote')
  query.exec((err, data) => {
    if (err) throw err;
    let context = {
      quote: data
    }
    res.json(context)
  })
});



router.post('/', function(req, res, next){
  let author = new Author({name:req.body.author})
  let content = req.body.content;
  let contentSlug = slug( words(content).slice(0, 4).join(' ') )

  author.save((err)=> {
    if (err) throw err;
    let quote = new Quote({
      content: content,
      author: author.id,
      slug: author.slug + '-' + contentSlug
    });

    quote.save((err) => {
      console.log(quote.slug)
      if (err) throw err;
      res.status(200).json({status:"ok"})
    })
  })
});

module.exports = router;
