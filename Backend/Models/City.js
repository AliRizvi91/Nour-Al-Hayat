const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const City_Schema = new Schema({
    Name: {
        type: Schema.Types.String,
        required: true
    },
    ProvinceId: {
        type: Schema.Types.ObjectId,
        ref: 'Province',
        required: true
    },
})

const City_Model = mongoose.model('City',City_Schema)

module.exports = City_Model;