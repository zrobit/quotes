const express = require('express');
const {getPagQuotes} = require('../queries/quote-query');
const {getMetaBy} = require('../queries/meta-query');

const ssr = global.ssr;
const router = new express.Router();

// Total quotes 10620
function HomeController(req, res) {
  let page = req.params.page;

  if (/^[1-9][0-9]*$/.test(page)) {
    page = parseInt(page, 10);
  } else {
    page = 1;
  }

  const context = {
    prevPage: page === 1 ? 1062 : page - 1,
    nextPage: page === 1062 ? 1 : page + 1
  };

  Promise.all([getPagQuotes({}, 10, page)]).then(([quotes]) => {
    const state = {
      quote: quotes
    };
    // context.meta = meta;
    context.state = state;
    ssr(req, res, context);
  });
}

router.get('/', HomeController);

router.get('/pag/:page', HomeController);

module.exports = router;
