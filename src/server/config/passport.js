const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
(req, email, password, done) => {
  User.findOne({email}, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, req.flash('loginMessage', 'Correo o password incorrectos'));
    }

    bcrypt.compare(password, user.password, (err, res) => {
      if (err) {
        throw err;
      }
      if (!res) {
        return done(null, false, req.flash('loginMessage', 'Correo o password incorrectos'));
      }
      const returnUser = {
        email: user.email,
        id: user.id
      };
      return done(null, returnUser, {
        message: 'Logged In Successfully'
      });
    });
  });
}));

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
(req, email, password, done) => {
  User.findOne({email}, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, false, req.flash('signupMessage', 'El correo ya se registro'));
    }
    const newUser = new User();
    newUser.email = email;
    newUser.password = password;
    newUser.save(err => {
      if (err) {
        throw err;
      }
      return done(null, newUser);
    });
  });
}));
