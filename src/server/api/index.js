var express = require('express')
  , router = express.Router()

router.use('/quotes', require('./quoteApi'))
router.use('/authors', require('./authorApi'))
// router.use('/cars', require('./cars'))

module.exports = router
