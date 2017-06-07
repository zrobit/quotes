const express = require('express');
const axios = require('axios');
const api = axios.create({
  baseURL: 'http://localhost:3000/api/'
});

const Meta = require('../models/meta');

const ssr = global.ssr

const router = express.Router();


function getMeta(param){
  return new Promise((resolve, reject)=>{
    Meta.findOne({}).exec((err, meta)=>{
      if (err) throw err;
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
    const [meta, quote] = values;

    if (quote.quote === null){
      res.status(404).send('No encontrado')
    }

    context.meta = values[0];
    context.state = {
      quote: {
        detail: quote.quote
      },
      author: {
        detail: quote.quote.author
      }
    }
    console.log(JSON.stringify(context.state))
    ssr(req, res, context)
  })
}


router.get('/:slug', quoteDetailController)

module.exports = router;
