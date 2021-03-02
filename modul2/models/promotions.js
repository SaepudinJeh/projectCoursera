const mongoose = require('mongoose');

const promotionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Promotions', promotionSchema);