const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cropSchema = new Schema({
  name: { type: String },
  description: { type: String },
  cycle: { type: String },
  droughttolerant: { type: String },
  watering: { type: String },
  sun: [String],
  soil: {type: String},
  growthrate: {type: String},
  fruitsin: [String]
});

module.exports = mongoose.model('Crop', cropSchema);
