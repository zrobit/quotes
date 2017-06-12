const express = require('express');

const {getQuoteBy} = require('../queries/quote-query');
const {getMetaBy} = require('../queries/meta-query');

const ssr = global.ssr;
const router = new express.Router();

function quoteDetailController(req, res) {
  const slug = req.params.slug;
  const context = {};
  Promise.all([getMetaBy(), getQuoteBy({slug})]).then(([meta, quote]) => {
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
