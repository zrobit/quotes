const express = require('express');
const axios = require('axios');
const passport = require('passport');
const isEmail = require('validator/lib/isEmail');

const ssr = global.ssr;

const router = express.Router();


router.get('/login', function(req, res){
  let field = req.query.field;
  if(field){
    if(!isEmail(field)){res.redirect('/login')}
  }

  let context = {
    state:{
      auth: {
        error: req.flash('loginMessage')[0]
      }
    }
  };
  ssr(req, res, context)
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      let email = req.body.email;
      let url = isEmail(email) ? '/login?field='+ email : '/login';
      return res.redirect(url);
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
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
