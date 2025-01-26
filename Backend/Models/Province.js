const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Province_Schema = new Schema({
    Name: {
        type: Schema.Types.String,
        required: true
    },
    CountryId: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: true
    },
})

const Province_Model = mongoose.model('Province',Province_Schema)

module.exports = Province_Model;