const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slug = require('slugg')

const config = {
  timestamps: true,
  toJSON : {
    virtuals:true
  },
}

var metaSchema = new Schema({
  slug: {type: String, required: true, unique: true, index: true},
  quote: {type: Schema.Types.ObjectId, ref: 'Quote'},
}, config);

var Meta = mongoose.model('Meta', metaSchema);
module.exports = Meta;
