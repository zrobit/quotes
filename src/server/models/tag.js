var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const config = {
  timestamps: true
}

var tagSchema = new Schema({
  name: String,
  slug: String
});


var Tag = mongoose.model('Tag', tagSchema);

// make this available to our users in our Node applications
module.exports = Tag;
