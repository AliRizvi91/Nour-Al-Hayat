const express = require('express')
const Feedback_R = express.Router();
const {upload} = require('../middleware/multer.middleware')

const {
    getAllFeedbacks,
    getFeedback,
    addFeedback,
    updateFeedback,
    deleteFeedback
  } = require('../Controllers/Feedback_C')

  Feedback_R.route('/')
  .get(getAllFeedbacks)
  .post(upload.single('image'),addFeedback)


  Feedback_R.route('/:id')
  .get(getFeedback)
  .put(updateFeedback)
  .delete(deleteFeedback)

module.exports = Feedback_R


