const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Feature_Schema = new Schema({
    image: {
        type: Schema.Types.String,
        required: true
    },
    name: {
        type: Schema.Types.String,
        required: true
    },
    explaination: {
        type: Schema.Types.String,
        required: true
    },
    
})

const Feature_Model = mongoose.model('Feature',Feature_Schema)

module.exports = Feature_Model;