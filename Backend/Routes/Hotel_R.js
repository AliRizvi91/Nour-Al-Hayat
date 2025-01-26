const express = require('express')
const Hotel_R = express.Router();

const {
    getAllHotels,
    getHotel,
    addHotel,
    updateHotel,
    deleteHotel
  } = require('../Controllers/Hotel_C')

  Hotel_R.route('/')
  .get(getAllHotels)
  .post(addHotel)


  Hotel_R.route('/:id')
  .get(getHotel)
  .put(updateHotel)
  .delete(deleteHotel)

module.exports = Hotel_R


