var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const config = {
  timestamps: true
}

var quoteSchema = new Schema({
  content: {type: String, text: true},
  size: {type: String, enum:['tiny', 'small', 'medium', 'large']},
  slug: String,
  author: { type: Schema.Types.ObjectId, ref: 'Author' },
  tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}]
}, config);

quoteSchema.pre('save', function (next) {
  let self = this;
  let len = self.content.length
  self.size = [
  'large', 'medium', 'small', 'tiny'
  ][[180, 120, 60, 0].findIndex(elem => len > elem)];
  next();
});

var Quote = mongoose.model('Quote', quoteSchema);
module.exports = Quote;
