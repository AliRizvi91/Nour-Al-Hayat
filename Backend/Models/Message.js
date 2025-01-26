const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message_Schema = new Schema({
    senderId:{
        type:Schema.Types.String,
    },
    recieverId:{
        type:Schema.Types.String,
    },
    text:{
        type:Schema.Types.String,
    }
},
    {
        timestamps: true
    }
)

const Message_Model = mongoose.model('Message',Message_Schema)

module.exports = Message_Model;