const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slug = require('slugg')

const config = {
  timestamps: true,
  toJSON : {virtuals:true},
  id: false
}


var authorSchema = new Schema({
  name: String,
  slug: String,
  bio: {
    avatar: String,
    resume: String,
    meta:[{_id:false, label:String, value:String}]
  }
}, config);

authorSchema.pre('save', function(next) {
  this.slug = slug(this.name);
  next();
});

authorSchema.virtual('quotes', {
  ref: 'Quote',
  localField: '_id',
  foreignField: 'author'
});

var Author = mongoose.model('Author', authorSchema);
module.exports = Author;

