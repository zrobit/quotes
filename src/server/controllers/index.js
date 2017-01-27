var express = require('express')
  , router = express.Router()

router.use('/', require('./homeController'))
router.use('/frase', require('./quoteController'))
// router.use('/about', require('./about'))

module.exports = router
