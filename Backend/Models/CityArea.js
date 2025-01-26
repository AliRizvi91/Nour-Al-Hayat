const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CityArea_Schema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    cityId: {
        type: Schema.Types.ObjectId,
        ref: 'City',
        required: true
    },
})

const CityArea_Model = mongoose.model('CityArea',CityArea_Schema)

module.exports = CityArea_Model;