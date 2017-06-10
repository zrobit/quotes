const express = require('express');
const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:3000/api/'
});

const ssr = global.ssr;

const router = new express.Router();

router.get('/:user', (req, res) => {
  const context = {};

  api.get('/home')
    .then(response => {
      const state = {
        app: {
          ref: 'HomeSection',
          data: response.data
        }
      };
      context.state = state;
      ssr(req, res, context);
    });
});

module.exports = router;
