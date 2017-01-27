var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var config = require('../../config')

var router = express.Router();

router.use('/styles', stylus.middleware({
  debug: true,
  src: __dirname + '/../../assets/styles',
  dest: __dirname + '/../../../dist/public/assets/styles',
  serve: true,
  forse: false,
  compile: function (str, path) {
    return stylus(str).set('filename', path).use(nib());
  }
}));

// router.use('/styles', function(req, res){

//   res.json(__dirname + '/../../build/public/assets/styles')

// });
router.use('/styles', express.static(__dirname+'/../../../dist/public/assets/styles'));
// router.use('/scripts', express.static(__dirname + '/../../build/public/assets/scripts'));
router.use('/images', express.static(__dirname + '/../assets/images'));
router.use('/media/images', express.static(config.MEDIA_IMAGES));
router.use('/fonts', express.static(__dirname + '/../assets/fonts'));


module.exports = router;
