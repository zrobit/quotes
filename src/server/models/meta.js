const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const config = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};

const metaSchema = new Schema({
  path: {type: String, require: true, unique: true, index: true},
  title: {type: String, require: true, maxlength: 80},
  description: {type: String, maxlength: 160},
  og: {
    title: {type: String, maxlength: 90},
    description: {type: String, maxlength: 200}
  }
}, config);

const Meta = mongoose.model('Meta', metaSchema);
module.exports = Meta;

