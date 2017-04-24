const express = require('express');
const axios = require('axios');
const api = axios.create({
  baseURL: 'http://localhost:3000/api/'
});

const ssr = global.ssr

var router = express.Router();


router.get('/', function(req, res){
  let context = {};

  api.get('/quotes')
    .then(function(response){
      console.log(response.data)
      let state = {
        app: {
          ref: 'HomeSection'
        },
        quote: response.data
      }
      context.state = state;
      ssr(req, res, context)
    })
});


module.exports = router;
