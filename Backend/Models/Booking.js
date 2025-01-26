const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Booking_Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    roomId: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    startDate: {
        type: Schema.Types.Date,
        required: true
    },
    endDate: {
        type: Schema.Types.Date,
        required: true
    },
    guests: {
        type: Schema.Types.Number,
        required: true
    },
    amount: {
        type: Schema.Types.String,
        required: true
    },
    statusId: {
        type: Schema.Types.ObjectId,
        ref: 'Status',
        required: true
    },
})

const Booking_Model = mongoose.model('Booking',Booking_Schema)

module.exports = Booking_Model;