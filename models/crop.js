const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cropSchema = new Schema({
  name: { type: String },
  watering: { type: String },
  cycle: { type: String },
  droughtTolerance: { type: String },
  sun: { type: String },
  description: { type: String }
});

module.exports = mongoose.model('Crop', cropSchema);
