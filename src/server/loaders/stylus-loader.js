const stylus = require('stylus');

module.exports = (data, file) => {
  return stylus(data).set('filename', file).render();
  // return stylus(str).set('filename', path).use(nib());

};
