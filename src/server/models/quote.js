const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hashId = require('shortid');
const words = require('lodash').words;
const slug = require('slugg');

const config = {
  timestamps: true,
  toJSON: {
    transform(doc, obj) {
      obj.id = obj._id;
      delete obj._id;
    }
  }
};

const quoteSchema = new Schema({
  hashId: {type: String, index: true, default: hashId.generate},
  content: {type: String, text: true},
  slug: String,
  size: {type: String, enum: ['tiny', 'small', 'medium', 'large']},
  sizeInt: Number,
  author: {type: Schema.Types.ObjectId, ref: 'Author'},
  tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}]
}, config);

quoteSchema.pre('save', function (next) {
  const self = this;
  const len = self.content.length;

  self.slug = slug(words(self.content).slice(0, 7).join(' '));

  self.sizeInt = len;
  self.size = [
    'large', 'medium', 'small', 'tiny'
  ][[180, 120, 60, 0].findIndex(elem => len > elem)];
  next();
});

const Quote = mongoose.model('Quote', quoteSchema);
module.exports = Quote;
