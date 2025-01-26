const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Contact_Schema = new Schema({
    Message: {
        type: Schema.Types.String,
        required: true
    },
    Name: {
        type: Schema.Types.String,
        required: true
    },
    Email: {
        type: Schema.Types.String,
        required: true
    },
    Subject: {
        type: Schema.Types.String,
        required: true
    },
})

const Contact_Model = mongoose.model('Contact',Contact_Schema)

module.exports = Contact_Model;