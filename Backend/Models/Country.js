const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Country_Schema = new Schema({
    Name: {
        type: Schema.Types.String,
        required: true
    },
    Code:{
        type: Schema.Types.String,
        required: true
    }
})

const Country_Model = mongoose.model('Country',Country_Schema)

module.exports = Country_Model;