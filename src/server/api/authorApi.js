const express = require('express');
const router = express.Router();

// const Quote = require('../models/quote');
const Author = require('../models/author');

router.get('/', function(req, res, next){
  let query = Author.find({}).select('name slug -_id')

  query.exec((err, data)=>{
    if (err) throw err;
    res.json(data)
  })
});

// router.post('/', function(req, res, next){
//   let author = new Author({name:req.body.author})
//   author.save((err)=> {
//     if (err) throw err;
//     let quote = new Quote({ content:  req.body.content, author: author._id});
//     quote.save((err) => {
//     if (err) throw err;
//     res.status(200).json({status:"ok"})
//     })
//   })
// });

module.exports = router;
