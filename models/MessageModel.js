const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  recipient: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  listing: { type: Schema.Types.ObjectId, ref: 'Trading', required: false },
  content: { type: String, required: true }
}, {timestamps: true});

module.exports = mongoose.model('Message', messageSchema);