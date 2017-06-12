const Author = require('../models/author');

function getAuthorBy(arg = {}) {
  return Author
    .findOne(arg)
    .select('name slug bio')
    .populate({
      path: 'quotes',
      select: 'author size slug content tags -_id',
      populate: {
        path: 'tags',
        select: 'slug name -_id'
      }
    })
    .exec();
}

module.exports.getAuthorBy = getAuthorBy;
