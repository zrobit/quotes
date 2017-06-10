const express = require('express');
const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:3000/api/'
});

const Meta = require('../models/meta');

const ssr = global.ssr;

const router = new express.Router();

function getMeta() {
  return new Promise(resolve => {
    Meta.findOne({}).exec((err, meta) => {
      if (err) {
        throw err;
      }
      resolve(meta);
    });
  });
}

function getQuote(slug) {
  return new Promise(resolve => {
    api.get(`/quotes/${slug}`)
      .then(response => {
        resolve(response.data);
      });
  });
}

function quoteDetailController(req, res) {
  const slug = req.params.slug;
  const context = {};
  Promise.all([getMeta('hi'), getQuote(slug)]).then(values => {
    const [meta, quote] = values;

    if (quote.quote === null) {
      return res.status(404).send('No encontrado');
    }

    context.meta = meta;
    context.state = {
      quote: {
        detail: quote.quote
      },
      author: {
        detail: quote.quote.author
      }
    };

    ssr(req, res, context);
  });
}

router.get('/:slug', quoteDetailController);

module.exports = router;
