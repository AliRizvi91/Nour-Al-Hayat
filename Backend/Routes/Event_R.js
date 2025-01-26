const express = require('express')
const Event_R = express.Router();
const {upload} = require('../middleware/multer.middleware')

const {
    getAllEvents,
    getEvent,
    addEvent,
    updateEvent,
    deleteEvent
  } = require('../Controllers/Event_C')

  Event_R.route('/')
  .get(getAllEvents)
  .post(upload.single('image'),addEvent)


  Event_R.route('/:id')
  .get(getEvent)
  .put(upload.single('image'),updateEvent)
  .delete(deleteEvent)

module.exports = Event_R


