const express = require('express');
const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:3000/api/'
});

const ssr = global.ssr;

const router = new express.Router();

const getMeta = require('./meta-controller');

function getAuthor(slug) {
  return new Promise((resolve, reject) => {
    api.get(`/authors/${slug}`)
      .then(response => {
        resolve(response.data);
      });
  });
}

function authorDetailController(req, res) {
  const slug = req.params.slug;
  const context = {};

  Promise.all([getMeta('hi'), getAuthor(slug)]).then(values => {
    const [meta, author] = values;
    if (author.author === null) {
      return res.status(404).send('No encontrado');
    }
    context.meta = meta;

    context.state = {
      author: {
        detail: author.author
      }
    };
    ssr(req, res, context);
  });
}

router.get('/:slug', authorDetailController);

module.exports = router;
