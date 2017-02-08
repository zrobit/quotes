const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user')

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use('local-login',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, req.flash('loginMessage', 'Correo o password incorrectos'));
      }

      bcrypt.compare(password, user.password, function (err, res) {
        if (!res)
          return done(null, false, req.flash('loginMessage', 'Correo o password incorrectos'));
        var returnUser = {
          email: user.email,
          id: user.id
        };
        return done(null, returnUser, {
          message: 'Logged In Successfully'
        });
      });
    });
  }
));

passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
},
function(req, email, password, done) {
  console.log('passport: 1')
  // process.nextTick(function() {
    User.findOne({'email': email}, function(err, user) {
      if (err)
        return done(err);
      if (user) {
        return done(null, false, req.flash('signupMessage', 'El correo ya se registro'));
      } else {
        var newUser = new User();
        newUser.email = email;
        newUser.password = password
        newUser.save(function(err, user) {
          if (err)throw err;
          return done(null, newUser);
        });
      }
    });
  // });
}));


