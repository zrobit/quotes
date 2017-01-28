const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slug = require('slugg')

var authorSchema = new Schema({
  name: String,
  slug: String,
}, {timestamps: true});

authorSchema.pre('save', function(next) {
  this.slug = slug(this.name);
  next();
});

// authorSchema.virtual('quotes', {
//   ref: 'Quote',
//   localField: '_id',
//   foreignField: 'author'
// });

var Author = mongoose.model('Author', authorSchema);
module.exports = Author;

