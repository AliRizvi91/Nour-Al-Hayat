const express = require('express')
const Room_R = express.Router();
const {upload} = require('../middleware/multer.middleware')

const {
  getAllRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom
} = require('../Controllers/Room_C')

Room_R.route('/')
  .get(getAllRooms)
  .post(upload.single('roomImage'), createRoom)


Room_R.route('/:id')
  .get(getRoom)
  .put(upload.single('roomImage'),updateRoom)
  .delete(deleteRoom)

  

module.exports = Room_R


