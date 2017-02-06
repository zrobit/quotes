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

module.exports = router;
