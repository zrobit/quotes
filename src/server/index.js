var hook = require('css-modules-require-hook');
const stylus = require('stylus')
// const nib = require('nib')
hook({
  generateScopedName: '[local]-[hash:base64:5]',
  extensions: ['.styl'],
  preprocessCss: function (css, filename) {
    return stylus(css)
      .set('filename', filename)
      .render();
  }
});

const app = require('./app');

module.exports = app.listen;
