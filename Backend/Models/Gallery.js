const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Gallery_Schema = new Schema({
    image: {
        type: Schema.Types.String,
        required: true
    },
    hotelId: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    
})

const Gallery_Model = mongoose.model('Gallery',Gallery_Schema)

module.exports = Gallery_Model;