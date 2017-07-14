const express = require('express');

const {getQuoteBy} = require('../queries/quote-query');
// const {getMetaBy} = require('../queries/meta-query');

const ssr = global.ssr;
const router = new express.Router();

function quoteDetailController(req, res) {
  const slug = req.params.slug;
  const context = {};
  Promise.all([getQuoteBy({slug})]).then(([quote]) => {
    if (quote === null) {
      return res.status(404).send('No encontrado');
    }

    context.meta = quote.meta;
    context.meta.url = req.baseUrl + req.path;
    quote.meta = null;

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
