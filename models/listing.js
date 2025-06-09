const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    item: {
        type: String,
        required: [true, 'Item name is required']
    },
    type: {
        type: String,
        required: [true, 'Item type is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1']
    },
    extraDetails: {
        type: String,
        default: ''
    },
    placeholderColor: {
        type: String,
        default: '#cccccc' 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const placeholderColors = ['#FFC0CB', '#ADD8E6', '#FFFFE0', '#90EE90', '#FFA07A', '#87CEEB']; 
listingSchema.pre('save', function(next) {
    if (this.isNew && this.placeholderColor === '#cccccc') { 
        this.placeholderColor = placeholderColors[Math.floor(Math.random() * placeholderColors.length)];
    }
    next();
});


module.exports = mongoose.model('Listing', listingSchema);