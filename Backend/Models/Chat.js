const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Chat_Schema = new Schema(
    { members: {
        type: Schema.Types.Array,
        // required: true
    }},
{
    timestamps:{
        require:true,
    }
}
)

const Chat_Model = mongoose.model('Chat',Chat_Schema)

module.exports = Chat_Model;