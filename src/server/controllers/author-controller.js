const express = require('express');
const {getAuthorBy} = require('../queries/author-query');

const ssr = global.ssr;

const router = new express.Router();

function authorDetailController(req, res) {
  const slug = req.params.slug;
  const context = {};

  Promise.all([getAuthorBy({slug})]).then(([author]) => {
    if (author === null) {
      return res.status(404).send('No encontrado');
    }

    context.meta = author.meta;
    context.meta.url = req.baseUrl + req.path;
    author.meta = null;

    context.state = {
      author: {
        detail: author
      }
    };
    ssr(req, res, context);
  });
}

router.get('/:slug', authorDetailController);

module.exports = router;
