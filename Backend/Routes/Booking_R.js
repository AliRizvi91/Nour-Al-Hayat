const express = require('express')
const Booking_R = express.Router();

const paymentIntegration = require('../Services/BRoomStripe');
const {
    getAllBookings,
    getBooking,
    addBooking,
    updateBooking,
    deleteBooking
  } = require('../Controllers/Booking_C')

  Booking_R.route('/')
  .get(getAllBookings)
  .post(addBooking)


  Booking_R.route('/:id')
  .get(getBooking)
  .put(updateBooking)
  .delete(deleteBooking)

  Booking_R.route('/checkout')
  .post(paymentIntegration);
module.exports = Booking_R


