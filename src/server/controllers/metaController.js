const Meta = require('../models/meta');

function getMeta() {
  return new Promise((resolve, reject) => {
    Meta.findOne({}).exec((err, meta) => {
      if (err) {
        throw err;
      }
      resolve(meta);
    });
  });
}

module.exports = getMeta;
