const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    
}, {
    timestamps: true
})

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
    },
    comments: [commentSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Promotions', promotionSchema);