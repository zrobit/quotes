const express = require('express');
const ssr = global.ssr
const router = express.Router();

const { getPagQuotesByTag } = require('../queries/quoteQuery');


function searchController(req, res){
  let slug = req.params.slug
  let context = {};
  getPagQuotesByTag(slug)
    .then((data) => {
      context.state ={
        quote: data
      }
      ssr(req, res, context)
    })
}

router.get('/:slug', searchController)

module.exports = router;
