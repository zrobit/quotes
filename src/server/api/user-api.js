const express = require('express');

const router = new express.Router();

const User = require('../models/user');

router.get('/check/:email', (req, res) => {
  User
    .findOne({email: req.param.email})
    .exec((err, user) => {
      if (err) {
        throw err;
      }
      if (user) {
        res.json({valid: false, msg: 'El correo ya se encuentra registrado'});
      } else {
        res.json({valid: true});
      }
    });
});

router.get('/profile/:hashId', (req, res) => {
  User
    .findOne({hashId: req.param.hashId})
    .exec((err, user) => {
      if (err) {
        throw err;
      }
      res.json(user);
    });
});

if (process.env.NODE_ENV === 'development') {
  router.get('/', (req, res) => {
    User
      .find({})
      .exec((err, users) => {
        if (err) {
          throw err;
        }
        res.json(users);
      });
  });
}

module.exports = router;
