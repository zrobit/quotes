var express = require('express');
var router = express.Router();

if (process.env.NODE_ENV==='build'){
  global.ssr = require('../../dist/shared/ssr').ssr

} else {
  global.ssr = require('../shared/ssr').ssr
}

router.use('/assets', require('./middleware/static'))

router.use('/api', require('./api'))

router.use('/', require('./controllers'))


module.exports = router
