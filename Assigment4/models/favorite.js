const mongoose = require('mongoose')

const favoriteSchema = mongoose.Schema({
    dishes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Favorite = require('favorite', favoriteSchema);

module.exports = Favorite;