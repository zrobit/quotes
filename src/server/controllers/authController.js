const express = require('express');
const axios = require('axios');

const ssr = global.ssr

const router = express.Router();


router.get('/login', function(req, res){
  let context = {
    state:{}
  };
  ssr(req, res, context)
});

router.post('/login', function(req, res){

});

router.get('/signup', function(req, res){
  let context = {
    state:{
      auth: {
        ref: 'SignupSection'
      }
    }
  };
  ssr(req, res, context)
});

router.post('/signup', function(req, res){

});

router.get('/logout', function(req, res){

});


module.exports = router;
