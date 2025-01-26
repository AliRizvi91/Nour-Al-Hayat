const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Feedback_Schema = new Schema({
    
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cityAreaId: {
        type: Schema.Types.ObjectId,
        ref: 'CityArea',
        required: true
    },
    feedback: {
        type: Schema.Types.String,
        required: true
    },
    
})

const Feedback_Model = mongoose.model('Feedback',Feedback_Schema)

module.exports = Feedback_Model;