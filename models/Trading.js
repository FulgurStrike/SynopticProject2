const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tradingSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  Price: { type: Number, required: true },},
    {
        timestamps: true,
    });
    
module.exports = mongoose.model('Trading', tradingSchema);
