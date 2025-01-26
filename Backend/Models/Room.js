const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Hotel = require('../Models/Hotel')

const Room_Schema = new Schema({
    roomType: {
        type: Schema.Types.String,
        required: true
    },
    roomNumber: {
        type: Schema.Types.Number,
        required: true
    },
    description: {
        type: Schema.Types.String,
        required: true
    },
    price: {
        type: Schema.Types.String,
        required: true
    },
    facilities: {
        type: Schema.Types.String,
        required: true
    },
    capacity: {
        type: Schema.Types.String,
        required: true
    },
    squareMeter: {
        type: Schema.Types.String,
        required: true
    },
    bedrooms: {
        type: Schema.Types.String,
        required: true
    },
    bathrooms: {
        type: Schema.Types.String,
        required: true
    },
    roomImage: [{
        type: Schema.Types.String,
        required: true
    }],
    
})

const Room_Model = mongoose.model('Room', Room_Schema)

module.exports = Room_Model;