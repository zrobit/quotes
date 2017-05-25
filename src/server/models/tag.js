var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const slug = require('slugg')

const config = {
  timestamps: true
}

const tagSchema = new Schema({
  name: String,
  slug: String,
  recurrence: {type: Number, default: 0 }
}, config);

tagSchema.pre('save', function (next) {
  this.slug = slug(this.name);
  next();
});

tagSchema.statics.getOrCreate = function (doc, cb) {
  const self = this;
  if (doc.name){
    if (!doc.slug){
      doc.slug = slug(doc.name)
    }
  }
  self.findOne({slug: doc.slug}, function(err, data){
    if(!data){
      self.create({name: doc.name}, function(err, data){
        cb(err, data)
      });
    }
    cb(err, data)
  })
};

const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;
