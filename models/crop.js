const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cropSchema = new Schema({
  name: { type: String },
  description: { type: String },
  cycle: { type: String },
  droughtTolerant: { type: String },
  watering: { type: String },
  sun: [String],
  soil: {type: String},
  growthRate: {type: String},
  fruitsIn: [String]
});

module.exports = mongoose.model('Crop', cropSchema);
