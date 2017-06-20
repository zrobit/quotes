const Tag = require('../models/tag');

function countTags(arg = {}) {
  return Tag.count(arg).exec();
}

function getTagBySlug(slug) {
  return Tag
    .findOne({slug})
    .select('name slug _id')
    .exec();
}

// Admin queries
function getTagsAdmin(arg = {}, start = 0, end = 10, sort = '-createdAt') {
  return Tag
    .find(arg)
    .limit(end - start)
    .sort(sort)
    .skip(start)
    .select('name slug recurrence createdAt')
    .exec();
}

function getTagByIdAdmin(id) {
  return Tag
    .findOne({_id: id})
    .select('-__v')
    .exec();
}
module.exports.Tag = Tag;
module.exports.countTags = countTags;
module.exports.getTagBySlug = getTagBySlug;

// Admin modules
module.exports.getTagsAdmin = getTagsAdmin;
module.exports.getTagByIdAdmin = getTagByIdAdmin;
