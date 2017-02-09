const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/check/:email', function(req, res, next){
  User
    .findOne({email:req.param.email})
    .exec((err, user) => {
      if (err) throw err;
      if(user) {
        res.json({valid: false, msg: 'El correo ya se encuentra registrado'})
      } else {
        res.json({valid: true})
      }
    })
});

router.get('/profile/:hashId', function(req, res){
  User
    .findOne({hashId:req.param.hashId})
    .exec((err, user) => {
      if (err) throw err;
      res.json(user);
    })
});


if (process.env.NODE_ENV ='development') {
  router.get('/', function(req, res, next){
    User
      .find({})
      .exec((err, users) => {
        if (err) throw err;
        res.json(users)
      })
  });
}

module.exports = router;
