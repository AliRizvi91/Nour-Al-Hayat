const express = require('express')
const Status_R = express.Router();

const {
    getAllStatuses,
    getStatus,
    addStatus,
    updateStatus,
    deleteStatus
  } = require('../Controllers/Status_C')

  Status_R.route('/')
  .get(getAllStatuses)
  .post(addStatus)


  Status_R.route('/:id')
  .get(getStatus)
  .put(updateStatus)
  .delete(deleteStatus)

module.exports = Status_R


