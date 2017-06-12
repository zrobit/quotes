const express = require('express');
const {getMetaBy} = require('../queries/meta-query');
const {getAuthorBy} = require('../queries/author-query');

const ssr = global.ssr;

const router = new express.Router();

function authorDetailController(req, res) {
  const slug = req.params.slug;
  const context = {};

  Promise.all([getMetaBy(), getAuthorBy({slug})]).then(values => {
    const [meta, author] = values;
    if (author === null) {
      return res.status(404).send('No encontrado');
    }
    context.meta = meta;

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
