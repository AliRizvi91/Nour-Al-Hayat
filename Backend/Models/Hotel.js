const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Hotel_Schema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    description: {
        type: Schema.Types.String,
        required: true
    },
    contactNumber: {
        type: Schema.Types.String,
        required: true
    },
    cityAreaId: {
        type: Schema.Types.ObjectId,
        ref: 'CityArea',
        required: true
    },
})

const Hotel_Model = mongoose.model('Hotel',Hotel_Schema)

module.exports = Hotel_Model;