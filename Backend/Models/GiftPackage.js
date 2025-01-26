const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Gift_Schema = new Schema({
    giftImages: {
        type: Schema.Types.Array,
        required: true
    },
    description: {
        type: Schema.Types.String,
        required: true
    },
    price: {
        type: Schema.Types.Number,
        required: true
    },
    
    
})

const Gift_Model = mongoose.model('Gift',Gift_Schema)

module.exports = Gift_Model;