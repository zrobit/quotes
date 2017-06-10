const express = require('express');

const router = new express.Router();

router.use('/', require('./homeController'));
router.use('/frase', require('./quoteController'));
router.use('/autor', require('./authorController'));
router.use('/perfil', require('./profileController'));
router.use('/buscar', require('./searchController'));
router.use('/', require('./authController'));

module.exports = router;
