const express = require('express')
  , router = express.Router()

router.use('/', require('./homeController'))
router.use('/frase', require('./quoteController'))
router.use('/autor', require('./authorController'))
router.use('/', require('./authController'))

module.exports = router
