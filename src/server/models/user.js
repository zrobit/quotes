const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

const config = {
  timestamps: true
}

const userSchema = new Schema({
  username: String,
  email: {type: String, required: true},
  password: String,
  firstName: {type: String, },
  lastName: {type: String, },
  password: {type: String, required: true },
}, config);

userSchema.pre('save', function (next) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(this.password, salt, function(err, hash) {
      if (err) {
        throw err;
      } else {
        this.password = hash;
        next();
      }
    });
  });
});

var User = mongoose.model('User', userSchema);

module.exports = User;
