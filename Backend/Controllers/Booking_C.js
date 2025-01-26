const Booking_C = require('../Models/Booking')

//___---- Get All Bookings----___

async function getAllBookings(req, res) {
    try {
      const Booking = await Booking_C.find().populate('statusId').populate('roomId').populate('userId');
      return res.status(200).json(Booking);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get all Bookings " });    
    }
  }
  
//___---- Get Booking by Id----___

async function getBooking(req, res) {
    try {
      const id = req.params.id
      const BookingId = await Booking_C.findById(id).populate('statusId').populate('roomId');
      return res.status(200).json(BookingId);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get Booking by Id " });    
    }
  }

  
//___---- Create Booking----___

async function addBooking(req, res) {
  const { BookRoomdata } = req.body;
  console.log("Backend",BookRoomdata);
  

  if (!Array.isArray(BookRoomdata) || BookRoomdata.length === 0) {
      return res.status(400).send("No booking data provided");
  }

  try {
      const bookings = await Booking_C.create(BookRoomdata); // If inserting multiple bookings
      return res.status(201).json(bookings);
  } catch (error) {
      console.error(error);
      return res.status(500).send("Failed to add booking");
  }
}
  
//___---- Update Booking----___

async function updateBooking(req, res) {
    try {
      const BookingId = req.params.id;
      const {userId,roomId,startDate,endDate,guests,amount,statusId} = req.body;
      const updated=await Booking_C.findByIdAndUpdate(BookingId,{userId,roomId,startDate,endDate,guests,statusId},{new:true});
      if (!updated) return res.status(404).json({ message: `Failed to Update Booking because it is not found` });
      return res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to Update Booking" });
    }
  }

  
//___---- Delete Booking----___

async function deleteBooking(req, res) {
    try {
      const BookingId = req.params.id;
      const deleted = await Booking_C.findByIdAndDelete(BookingId);
      if (!deleted) return res.status(404).json({ message: `Failed to Delete Booking because .It is not Found` });
      return res.status(200).json(deleted);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: `Failed to delete Booking` });
    }
  }
  module.exports = {
    getAllBookings,
    getBooking,
    addBooking,
    updateBooking,
    deleteBooking
  }

