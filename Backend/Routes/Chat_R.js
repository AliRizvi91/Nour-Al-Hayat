const express = require('express');
const Chat_R = express.Router();

const { addChat, findChat, userChat } = require('../Controllers/Chat_C');

// POST request to create a chat
Chat_R.post('/', addChat);

// GET request for a user chat by userId
Chat_R.get('/:userId', userChat);

// GET request to find a chat between two users
Chat_R.get('/find/:firstId/:secondId', findChat);

module.exports = Chat_R;
