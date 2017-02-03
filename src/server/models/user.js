var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const config = {
  timestamps: true
}

const userSchema = new Schema({
  username: String,
  email: {type: String, required: true),
  password: String,
  firstName: {type: String, },
  lastName: {type: String, },
  password: {type: String, required: true },
}, config);

var User = mongoose.model('User', userSchema);

module.exports = User;
