const City_C = require('../Models/City')

//___---- Get All Cities----___

async function getAllCities(req, res) {
    try {
      const City = await City_C.find().populate('ProvinceId');
      return res.status(200).json(City);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get all Cities " });    
    }
  }
  
//___---- Get City by Id----___

async function getCity(req, res) {
    try {
      const id = req.params.id
      const CityId = await City_C.findById(id).populate('ProvinceId');
      return res.status(200).json(CityId);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get City by Id " });    
    }
  }

  
//___---- Create City----___

async function addCity(req, res) {
    try {
      const {Name,ProvinceId} = req.body;
      const Create_City = await City_C.create({Name,ProvinceId});
      res.header("location",`${req.originalUrl}/${Create_City._id}`);
      return res.status(201).json(Create_City);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to Add City" });
    }
  }
  
//___---- Update City----___

async function updateCity(req, res) {
    try {
      const CityId = req.params.id;
      const {Name,ProvinceId} = req.body;
      const updated=await City_C.findByIdAndUpdate(CityId,{Name,ProvinceId},{new:true});
      if (!updated) return res.status(404).json({ message: `Failed to Update City because it is not found` });
      return res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to Update City" });
    }
  }

  
//___---- Delete City----___

async function deleteCity(req, res) {
    try {
      const CityId = req.params.id;
      const deleted = await City_C.findByIdAndDelete(CityId);
      if (!deleted) return res.status(404).json({ message: `Failed to Delete City because .It is not Found` });
      return res.status(200).json(deleted);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: `Failed to delete City` });
    }
  }
  module.exports = {
    getAllCities,
    getCity,
    addCity,
    updateCity,
    deleteCity
  }

