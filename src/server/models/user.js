const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const hashId = require('shortid');

const config = {
  timestamps: true
}

const userSchema = new Schema({
  hashId:{type:String, index: true, default: hashId.generate},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true },
  name: {type: String},
  profile:{
    description: String,
    avatar: String,
  },
  likes:{type: Number, default:0}
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
