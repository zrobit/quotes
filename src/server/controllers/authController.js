const express = require('express');
const axios = require('axios');
const passport = require('passport');


const ssr = global.ssr;

const router = express.Router();


router.get('/login', function(req, res){
  let context = {
    state:{
      auth: {
        error: req.flash('loginMessage')[0]
      }
    }
  };
  ssr(req, res, context)
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

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
