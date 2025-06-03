const mongoose = require('mongoose');

const ShopCropSchema = new mongoose.Schema({
    name: {type: String, required: true},
    quantity: {type: Number, default: 0, min: 0}
});

module.exports = mongoose.model('ShopCrop', ShopCropSchema, 'crops')