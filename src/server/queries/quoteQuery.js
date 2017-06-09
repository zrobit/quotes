const Quote = require('../models/quote');

const { getTagBySlug } = require('./tagQuery')


function countQuotes(arg={}){
  return Quote.count(arg).exec();
}
function getQuotes(arg={}, nItems=10, nPage=1){
  return Quote
    .find(arg)
    .limit(nItems)
    .sort({'createdAt':-1})
    .skip((nPage-1)*nItems)
    .select('slug content author tags size')
    .populate('tags', 'name slug -_id')
    .populate('author', 'name slug')
    .exec();
}

function getPagQuotes(arg={}, nItems=10, nPage=1){
  return Promise.all([
    getQuotes(arg, nItems, nPage),
    countQuotes(arg),
  ]).then(([quotes, count]) => {
    let next = count > nItems*nPage ? nPage + 1: null;
    return {
      count: count,
      next: next,
      quotes: quotes
    }
  })
}

function getPagQuotesByTag(slug, nItems=10, nPage=1){
  return new Promise((resolve, reject) => {
    getTagBySlug(slug).then((tag) => {
      getPagQuotes({'tags': tag._id}).then((quotes)=>{
        resolve ({
          tag: tag,
          quotes: quotes.quotes,
          next: quotes.next,
          count: quotes.count
        })
      })
    })
  })
}

module.exports.countQuotes = countQuotes;
module.exports.getQuotes = getQuotes;
module.exports.getPagQuotes = getPagQuotes;
module.exports.getPagQuotesByTag = getPagQuotesByTag;
