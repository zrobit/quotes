const express = require('express');
const axios = require('axios');

const ssr = global.ssr

const router = express.Router();


router.get('/login', function(req, res){
  res.json('login/get')

});
router.post('/login', function(req, res){

});

router.get('/signup', function(req, res){
  res.json('signup/get')

});
router.post('/signup', function(req, res){

});
router.get('/logout', function(req, res){

});


module.exports = router;
