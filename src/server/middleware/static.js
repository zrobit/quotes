var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var config = require('../../config')

var router = express.Router();

router.use('/styles', stylus.middleware({
  debug: true,
  src: config.ASSETS_STYLES,
  dest: config.PUBLIC_STYLES,
  serve: true,
  forse: false,
  compile: function (str, path) {
    return stylus(str).set('filename', path).use(nib());
  }
}));

// router.use('/styles', function(req, res){

//   res.json(__dirname + '/../../build/public/assets/styles')

// });
router.use('/styles', express.static(config.PUBLIC_STYLES));
// router.use('/scripts', express.static(__dirname + '/../../build/public/assets/scripts'));
router.use('/images', express.static(config.ASSETS_IMAGES));
router.use('/media/images', express.static(config.MEDIA_IMAGES));
router.use('/fonts', express.static(config.ASSETS_FONTS));


module.exports = router;
