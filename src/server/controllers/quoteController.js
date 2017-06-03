const express = require('express');
const axios = require('axios');
const api = axios.create({
  baseURL: 'http://localhost:3000/api/'
});

const Meta = require('../models/meta');

const ssr = global.ssr

const router = express.Router();


// router.get('/:slug', function(req, res){
//   let slug = req.params.slug

//   let context = {};

//   api.get('/quotes/' + slug)
//     .then(function(response){
//       let state = {
//         quote: {
//           detail: response.data.quote
//         },
//         author: {
//           detail: response.data.quote.author
//         }
//       }
//       context.state = state;
//       ssr(req, res, context)
//     })
// });

function getMeta(param){
  return new Promise((resolve, reject)=>{
    Meta.findOne({}).exec((err, meta)=>{
      if (err) throw err;
      // console.log('meta>>>>>>')
      // console.log(meta)
      resolve(meta);
    })
  })
}

function getQuote(slug){
  return new Promise((resolve, reject)=>{
  api.get(`/quotes/${slug}`)
    .then(function(response){
      resolve(response.data)
    })
  })
}


function quoteDetailController(req, res){
  let slug = req.params.slug
  let context = {};
  Promise.all([getMeta('hi'), getQuote(slug)]).then( values => {
    let meta = values[0];
    let quote = values[1];
    if (quote.quote === null){
      res.status(404).send('No encontrado')
    }

    // debugger;
    // console.log(values)
    context.meta = values[0];
    context.state = {
      quote: {
        detail: values[1].quote
      },
      author: {
        detail: values[1].quote.author
      }
    }
    // console.log(context.state)
    // debugger;
    ssr(req, res, context)
  })
}



router.get('/:slug', quoteDetailController)

module.exports = router;
