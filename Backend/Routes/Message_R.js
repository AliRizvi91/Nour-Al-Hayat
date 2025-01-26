const express = require('express');
const Message_R = express.Router();

const { addMessage,getAllMessages} = require('../Controllers/Message_C');

// POST request to create a Message
Message_R.post('/', addMessage);

// GET request for a user Message by userId
Message_R.get('/', getAllMessages);


module.exports = Message_R;
