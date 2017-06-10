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

function getQuotes(page) {
  return new Promise(resolve => {
    api.get('/quotes?page=' + page)
      .then(response => {
        resolve(response.data);
      });
  });
}

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

  Promise.all([getMeta('hi'), getQuotes(page)]).then(values => {
    const state = {
      quote: values[1]
    };
    context.meta = values[0];
    context.state = state;
    ssr(req, res, context);
  });
}

router.get('/', HomeController);

router.get('/pag/:page', HomeController);

module.exports = router;