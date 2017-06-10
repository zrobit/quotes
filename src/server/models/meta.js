const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const config = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};

const metaSchema = new Schema({
  slug: {type: String, required: true, unique: true, index: true},
  quote: {type: Schema.Types.ObjectId, ref: 'Quote'}
}, config);

metaSchema.virtual('og').get(() => {
  return {
    url: 'http://www.fraseary.com',
    title: 'Fraseary',
    type: 'website',
    description: 'descript... for fraseary web',
    image: 'http://media.fraseary.com/fraseary-logo-1200x1200.png'
  };
});

const Meta = mongoose.model('Meta', metaSchema);
module.exports = Meta;

