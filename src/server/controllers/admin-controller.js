const express = require('express');

const router = new express.Router();

function adminController(req, res) {
  res.render('admin');
}

router.get('/', adminController);
module.exports = router;
