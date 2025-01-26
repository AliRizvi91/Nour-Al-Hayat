const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Status_Schema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    }
})

const Status_Model = mongoose.model('Status',Status_Schema)

module.exports = Status_Model;