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

metaSchema.virtual('og').get(function(){
  return {
    url: 'http://www.fraseary.com',
    title: 'Fraseary',
    type: 'website',
    description: 'descript... for fraseary web',
    image: 'http://media.fraseary.com/fraseary-logo-1200x1200.png'
  }
})


var Meta = mongoose.model('Meta', metaSchema);
module.exports = Meta;

