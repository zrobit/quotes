const express = require('express');
const stylus = require('stylus');
const nib = require('nib');
const config = require('../../config');

const router = new express.Router();

router.use('/styles', stylus.middleware({
  debug: true,
  src: config.ASSETS_STYLES,
  dest: config.PUBLIC_STYLES,
  serve: true,
  forse: false,
  compile(str, path) {
    return stylus(str).set('filename', path).use(nib());
  }
}));

router.use('/styles', express.static(config.PUBLIC_STYLES));
router.use('/images', express.static(config.ASSETS_IMAGES));
router.use('/media/images', express.static(config.MEDIA_IMAGES));
router.use('/fonts', express.static(config.ASSETS_FONTS));

module.exports = router;
