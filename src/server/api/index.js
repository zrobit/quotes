const express = require('express');

const router = new express.Router();

router.use('/home', require('./home-api'));
router.use('/quotes', require('./quote-api'));
router.use('/authors', require('./author-api'));
router.use('/tags', require('./tag-api'));
router.use('/users', require('./user-api'));
router.use('/search', require('./search-api'));

module.exports = router;
