const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Role_Schema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    }
})

const Role_Model = mongoose.model('Role',Role_Schema)

module.exports = Role_Model;