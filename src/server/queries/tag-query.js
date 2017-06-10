const Tag = require('../models/tag');

function getTagBySlug(slug) {
  return Tag
    .findOne({slug})
    .select('name slug _id')
    .exec();
}

module.exports.getTagBySlug = getTagBySlug;
