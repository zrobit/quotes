var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var testSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: Date,
  updated_at: Date
});


var Test = mongoose.model('User', testSchema);

// make this available to our users in our Node applications
module.exports = Test;
