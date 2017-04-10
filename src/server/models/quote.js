var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const hashId = require('shortid');
var words = require('lodash').words;
var slug = require('slugg');

const config = {
  timestamps: true
}

var quoteSchema = new Schema({
  hashId:{type:String, index: true, default: hashId.generate},
  content: {type: String, text: true},
  slug: String,
  size: {type: String, enum:['tiny', 'small', 'medium', 'large']},
  sizeInt: Number,
  author: { type: Schema.Types.ObjectId, ref: 'Author' },
  tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}]
}, config);

quoteSchema.pre('save', function (next) {
  let self = this;
  let len = self.content.length;
  let getWords = words(self.content);

  self.slug = slug(words(self.content).slice(0, 7).join(' '));

  self.sizeInt = len;
  self.size = [
  'large', 'medium', 'small', 'tiny'
  ][[180, 120, 60, 0].findIndex(elem => len > elem)];
  next();
});

var Quote = mongoose.model('Quote', quoteSchema);
module.exports = Quote;
