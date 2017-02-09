var express = require('express')
  , router = express.Router()

router.use('/home', require('./homeApi'))
router.use('/quotes', require('./quoteApi'))
router.use('/authors', require('./authorApi'))
router.use('/tags', require('./tagApi'))
router.use('/users', require('./userApi'))
router.use('/search', require('./searchApi'))

module.exports = router
