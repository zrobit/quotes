const express = require('express');
const axios = require('axios');
const api = axios.create({
  baseURL: 'http://localhost:3000/api/'
});

const ssr = global.ssr

const router = express.Router();


router.get('/:slug', function(req, res){
  let slug = req.params.slug

  let context = {};


  api.get('/authors/' + slug)
    .then(function(response){
      let state = {
        quotes: response.data
      }
      context.state = state;
      ssr(req, res, context)
    })
});


module.exports = router;
