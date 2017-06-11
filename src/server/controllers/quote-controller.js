const express = require('express');

const {getQuoteBy} = require('../queries/quote-query');

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

function quoteDetailController(req, res) {
  const slug = req.params.slug;
  const context = {};
  Promise.all([getMeta('hi'), getQuoteBy({slug})]).then(([meta, quote]) => {
    if (quote === null) {
      return res.status(404).send('No encontrado');
    }

    context.meta = meta;
    context.state = {
      quote: {
        detail: quote
      },
      author: {
        detail: quote.author
      }
    };

    ssr(req, res, context);
  });
}

router.get('/:slug', quoteDetailController);

module.exports = router;
