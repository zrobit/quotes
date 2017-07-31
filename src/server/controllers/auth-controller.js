const express = require('express');
const passport = require('passport');
const isEmail = require('validator/lib/isEmail');

const ssr = global.ssr;

const router = new express.Router();

router.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  const field = req.query.field;
  if (field) {
    if (!isEmail(field)) {
      res.redirect('/login');
    }
  }

  const context = {
    state: {
      auth: {
        error: req.flash('loginMessage')[0]
      }
    }
  };
  ssr(req, res, context);
});

router.post('/login', (req, res, next) => {
  const password = req.body.password;
  const email = req.body.email;

  passport.authenticate('local-login', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      const url = isEmail(email) ? '/login?field=' + email : '/login';
      return res.redirect(url);
    }
    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/signup', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }

  const context = {
    state: {
      auth: {
        ref: 'SignupSection',
        error: req.flash('loginMessage')[0]
      }
    }
  };
  ssr(req, res, context);
});

router.post('/signup', (req, res, next) => {
  const password = req.body.password;
  const email = req.body.email;

  if (!email || !password) {
    return res.status(403).send('Forbiden(403): invalid values :V');
  } else if (!isEmail(email) || (password.length < 8)) {
    return res.status(403).send('Forbiden(403): invalid values :V');
  }

  passport.authenticate('local-signup', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/signup');
    }
    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
