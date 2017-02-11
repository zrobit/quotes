const express = require('express');
const axios = require('axios');
const api = axios.create({
  baseURL: 'http://localhost:3000/api/'
});

const ssr = global.ssr

var router = express.Router();

router.get('/:user', function(req, res){

  let context = {};

  api.get('/home')
    .then(function(response){
      let state = {
        app: {
          ref: 'HomeSection',
          data: response.data
        }
      }
      context.state = state;
      ssr(req, res, context)
    })
});


module.exports = router;