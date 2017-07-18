const Author = require('../models/author');

function countAuthors(arg = {}) {
  return Author.count(arg).exec();
}

function getAuthorBy(arg = {}) {
  return Author
    .findOne(arg)
    .select('name slug bio meta')
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

// Admin queries
function getAuthorsAdmin(arg = {}, start = 0, end = 10, sort = '-createdAt') {
  return Author
    .find(arg)
    .limit(end - start)
    .sort(sort)
    .skip(start)
    .select('name slug createdAt')
    .exec();
}

function getAuthorByIdAdmin(id) {
  return Author
    .findOne({_id: id})
    .exec();
}

module.exports.Author = Author;
module.exports.countAuthors = countAuthors;
module.exports.getAuthorBy = getAuthorBy;

// Admin modules
module.exports.getAuthorsAdmin = getAuthorsAdmin;
module.exports.getAuthorByIdAdmin = getAuthorByIdAdmin;
