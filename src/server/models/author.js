const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const slug = require('slugg');

const config = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};

const authorSchema = new Schema({
  name: String,
  slug: String,
  bio: {
    avatar: String,
    resume: String,
    meta: [{_id: false, label: String, value: String}]
  }
}, config);

authorSchema.virtual('quotes', {
  ref: 'Quote',
  localField: '_id',
  foreignField: 'author'
});

authorSchema.pre('save', function (next) {
  this.slug = slug(this.name);
  next();
});

authorSchema.statics.getOrCreate = function (doc, cb) {
  const self = this;
  if (doc.name) {
    if (!doc.slug) {
      doc.slug = slug(doc.name);
    }
  }
  self.findOne({slug: doc.slug}, (err, data) => {
    if (!data) {
      self.create({name: doc.name}, (err, data) => {
        cb(err, data);
      });
    }
    cb(err, data);
  });
};

const Author = mongoose.model('Author', authorSchema);
module.exports = Author;

