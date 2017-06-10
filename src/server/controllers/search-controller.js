const express = require('express');

const ssr = global.ssr;
const router = new express.Router();

const {getPagQuotesByTag} = require('../queries/quoteQuery');

function searchController(req, res) {
  const slug = req.params.slug;
  const context = {};
  getPagQuotesByTag(slug)
    .then(data => {
      context.state = {
        quote: data
      };
      ssr(req, res, context);
    });
}

router.get('/:slug', searchController);

module.exports = router;
