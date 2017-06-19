const Quote = require('../models/quote');

const {getTagBySlug} = require('./tag-query');

function countQuotes(arg = {}) {
  return Quote.count(arg).exec();
}

function getQuoteBy(arg = {}) {
  return Quote
    .findOne(arg)
    .select('slug content author size')
    .populate('author', 'name slug')
    .exec();
}

function getQuotes(arg = {}, nItems = 10, nPage = 1) {
  return Quote
    .find(arg)
    .limit(nItems)
    .sort({createdAt: -1})
    .skip((nPage - 1) * nItems)
    .select('slug content author tags size')
    .populate('tags', 'name slug')
    .populate('author', 'name slug')
    .exec();
}

function getPagQuotes(arg = {}, nItems = 10, nPage = 1) {
  return Promise.all([
    getQuotes(arg, nItems, nPage),
    countQuotes(arg)
  ]).then(([quotes, count]) => {
    const next = count > nItems * nPage ? nPage + 1 : null;
    return {
      count,
      next,
      quotes
    };
  });
}

function getPagQuotesByTag(slug, nItems = 10, nPage = 1) {
  return new Promise(resolve => {
    getTagBySlug(slug).then(tag => {
      getPagQuotes({tags: tag._id}, nItems, nPage).then(quotes => {
        resolve({
          tag,
          quotes: quotes.quotes,
          next: quotes.next,
          count: quotes.count
        });
      });
    });
  });
}

// Admin queries
function getQuotesAdmin(arg = {}, start = 0, end = 10) {
  return Quote
    .find(arg)
    .limit(end - start)
    .sort({createdAt: -1})
    .skip(start)
    .select('slug content sizeInt author')
    .exec();
}

function getQuoteByIdAdmin(id) {
  return Quote
    .findOne({_id: id})
    .select('slug content sizeInt author tags')
    .exec();
}

module.exports.countQuotes = countQuotes;
module.exports.getQuoteBy = getQuoteBy;
module.exports.getQuotes = getQuotes;
module.exports.getPagQuotes = getPagQuotes;
module.exports.getPagQuotesByTag = getPagQuotesByTag;

// Admin modules
module.exports.getQuotesAdmin = getQuotesAdmin;
module.exports.getQuoteByIdAdmin = getQuoteByIdAdmin;
