var express = require('express');
var router = express.Router();
// var isoMiddleware = require('./middleware').isoMiddleware
// import { isoMiddleware } from '../shared/iso2';




if (process.env.NODE_ENV==='build'){
  // var isoMiddleware = require('../../dist/shared/iso2').isoMiddleware;
  global.ssr = require('../../dist/shared/ssr').ssr

} else {
  // var isoMiddleware = require('../shared/iso2').isoMiddleware;
  global.ssr = require('../shared/ssr').ssr

}


router.use('/assets', require('./middleware/static'))

router.use('/api', require('./api'))

// router.use(isoMiddleware)

router.use('/', require('./controllers'))


module.exports = router
