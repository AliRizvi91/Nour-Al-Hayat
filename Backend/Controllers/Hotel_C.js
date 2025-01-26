const Hotel_C = require('../Models/Hotel')

//___---- Get All Hotels----___

async function getAllHotels(req, res) {
    try {
      const Hotel = await Hotel_C.find().populate('cityAreaId');
      return res.status(200).json(Hotel);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get all Hotels " });    
    }
  }
  
//___---- Get Hotel by Id----___

async function getHotel(req, res) {
    try {
      const id = req.params.id
      const HotelId = await Hotel_C.findById(id).populate('cityAreaId');
      return res.status(200).json(HotelId);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get Hotel by Id " });    
    }
  }

  
//___---- Create Hotel----___

async function addHotel(req, res) {
    try {
      const {name,description,cityAreaId,contactNumber} = req.body;
      const Create_Hotel = await Hotel_C.create({name,description,cityAreaId,contactNumber});
      res.header("location",`${req.originalUrl}/${Create_Hotel._id}`);
      return res.status(201).json(Create_Hotel);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to Add Hotel" });
    }
  }
  
//___---- Update Hotel----___

async function updateHotel(req, res) {
    try {
      const HotelId = req.params.id;
      const {name,description,cityAreaId,contactNumber} = req.body;
      const updated=await Hotel_C.findByIdAndUpdate(HotelId,{name,description,cityAreaId,contactNumber},{new:true});
      if (!updated) return res.status(404).json({ message: `Failed to Update Hotel because it is not found` });
      return res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to Update Hotel" });
    }
  }

  
//___---- Delete Hotel----___

async function deleteHotel(req, res) {
    try {
      const HotelId = req.params.id;
      const deleted = await Hotel_C.findByIdAndDelete(HotelId);
      if (!deleted) return res.status(404).json({ message: `Failed to Delete Hotel because .It is not Found` });
      return res.status(200).json(deleted);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: `Failed to delete Hotel` });
    }
  }
  module.exports = {
    getAllHotels,
    getHotel,
    addHotel,
    updateHotel,
    deleteHotel
  }

