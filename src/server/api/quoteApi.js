const express = require('express');
const router = express.Router();

const words = require('lodash').words
const slug = require('slugg')


const Quote = require('../models/quote');
const Author = require('../models/author');

const isPage = require('../middleware/isPage');


//api/quotes
router.get('/', isPage, function(req, res, next){
  const nPage = parseInt(req.query.page);
  const nItems = 10;
  Quote.count({}, (err, count) => {
    let next = count > nItems*nPage ? nPage + 1: null;
    let query = Quote.find({}).limit(10).sort({'createdAt':-1});
    query.skip((nPage-1)*nItems);
    query.select('slug content author tags size');
    query.populate('tags', 'name slug -_id');
    query.populate('author', 'name slug');
    query.exec((err, data) => {
      if (err) throw err;
      let context = {quotes: data, next: next}
      res.json(context)
    })
  });
});

//api/quotes/author/hashId
router.get('/author/:id', isPage, function(req, res, next){
  const nPage = parseInt(req.query.page);
  const nItems = 10;
  Quote.count({'author': req.params.id}, (err, count) => {
    let next = count > nItems*nPage ? nPage + 1: null;
    let query = Quote.find({'author': req.params.id}).limit(10).sort({'createdAt':-1});

    query.skip((nPage-1)*nItems);
    query.select('slug content author tags size');
    query.populate('tags', 'name slug -_id');
    query.populate('author', 'name slug hashId');
    query.exec((err, data) => {
      if (err) throw err;
      let context = {quotes: data, next: next}
      res.json(context)
    })
  });
});



//api/quotes/:slug
router.get('/:slug', function(req, res, next){
  let query = Quote.findOne({slug:req.params.slug})
  query.select('slug content author size');
  query.populate('author', 'name slug')
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
