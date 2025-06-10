const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tradingSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, {timestamps: true});
    
module.exports = mongoose.model('Trading', tradingSchema);
