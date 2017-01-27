var hook = require('css-modules-require-hook');
const stylus = require('stylus')
// const nib = require('nib')
hook({
  generateScopedName: '[name]-[local]-[hash:base64:5]',
  extensions: ['.styl'],
  preprocessCss: function (css, filename) {
    return stylus(css)
      .set('filename', filename)
      .render();
  }
});


require('./app.js')
