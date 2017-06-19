const express = require('express');

const router = new express.Router();

router.use('/', require('./home-controller'));
router.use('/frase', require('./quote-controller'));
router.use('/autor', require('./author-controller'));
router.use('/perfil', require('./profile-controller'));
router.use('/buscar', require('./search-controller'));
router.use('/', require('./auth-controller'));
router.use('/unicornio', require('./admin-controller'));

module.exports = router;
