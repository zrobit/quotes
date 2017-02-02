var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const slug = require('slugg')

const config = {
  timestamps: true
}

var tagSchema = new Schema({
  name: String,
  slug: String,
}, config);

tagSchema.pre('save', function (next) {
  this.slug = slug(this.name);
  next();
});

tagSchema.statics.getOrCreate = function (doc, callback) {
  const self = this;
  if (doc.name){
    if (!doc.slug){
      doc.slug = slug(doc.name)
    }
  }
  self.findOne({slug: doc.slug}).then(callback).catch((err, result) => {
    self.create({name: doc.name}).then(callback);
  });
};


var Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;
