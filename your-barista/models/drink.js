const mongoose = require('mongoose');

const drinkSchema = new mongoose.Schema({
    category : {
        type: String,
        enum: ['Organic Coffee', 'Organic Tea', 'Hot Drinks'],
        required: true
    },
    name : {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Drink', drinkSchema)