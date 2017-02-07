const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

const config = {
  timestamps: true
}

const userSchema = new Schema({
  username: String,
  email: {type: String, required: true},
  password: {type: String, required: true },
  firstName: {type: String},
  lastName: {type: String},
}, config);

userSchema.pre('save', function (next) {
  let self = this;
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(self.password, salt, function(err, hash) {
      if (err) {
        throw err;
      } else {
        self.password = hash;
        console.log('hash: '+ hash)
        next();
      }
    });
  });
});

var User = mongoose.model('User', userSchema);

module.exports = User;
