var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagSchema = new Schema({
  name: String,
  slug: String,
  created_at: Date,
  updated_at: Date
});


var Tag = mongoose.model('Tag', tagSchema);

// make this available to our users in our Node applications
module.exports = Tag;
