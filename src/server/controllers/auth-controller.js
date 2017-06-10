const express = require('express');
const passport = require('passport');
const isEmail = require('validator/lib/isEmail');

const ssr = global.ssr;

const router = new express.Router();

router.get('/login', function(req, res){
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
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
  let password = req.body.password;
  let email= req.body.email;

  passport.authenticate('local-login', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
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
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }

  let context = {
    state:{
      auth: {
        ref: 'SignupSection',
        error: req.flash('loginMessage')[0]
      }
    }
  };
  ssr(req, res, context)
});

router.post('/signup', function(req, res, next){
  let password = req.body.password;
  let email= req.body.email;

  if(!email || !password) {
    return res.status(403).send('Forbiden(403): invalid values :V')
  } else if(!isEmail(email) || (password.length < 8)){
    return res.status(403).send('Forbiden(403): invalid values :V')
  }

  passport.authenticate('local-signup', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      return res.redirect('/signup');
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


module.exports = router;
