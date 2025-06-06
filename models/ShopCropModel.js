const mongoose = require('mongoose');

const ShopCropSchema = new mongoose.Schema({
    name: {type: String, required: true},
    quantity: {type: Number, default: 1, min: 1}
}, {collection: 'shop'});

module.exports = mongoose.model('ShopCrop', ShopCropSchema, 'shop');
