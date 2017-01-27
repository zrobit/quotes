var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var quoteSchema = new Schema({
  content: String,
  slug: String,
  author: { type: Schema.Types.ObjectId, ref: 'Author' },
  created_at: Date,
  updated_at: Date
}, {timestamps: true});


var Quote = mongoose.model('Quote', quoteSchema);
module.exports = Quote;
