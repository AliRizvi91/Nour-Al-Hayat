const Country_C = require('../Models/Country')

//___---- Get All Countries----___

async function getAllCountries(req, res) {
    try {
      const Country = await Country_C.find();
      return res.status(200).json(Country);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get all Countries " });    
    }
  }
  
//___---- Get Country by Id----___

async function getCountry(req, res) {
    try {
      const id = req.params.id
      const CountryId = await Country_C.findById(id);
      return res.status(200).json(CountryId);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get Country by Id " });    
    }
  }

  
//___---- Create Country----___

async function addCountry(req, res) {
    try {
      const {Name,Code} = req.body;
      const Create_Country = await Country_C.create({Name,Code});
      res.header("location",`${req.originalUrl}/${Create_Country._id}`);
      return res.status(201).json(Create_Country);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to Add Country" });
    }
  }
  
//___---- Update Country----___

async function updateCountry(req, res) {
    try {
      const CountryId = req.params.id;
      const {Name,Code} = req.body;
      const updated=await Country_C.findByIdAndUpdate(CountryId,{Name,Code},{new:true});
      if (!updated) return res.status(404).json({ message: `Failed to Update Country because it is not found` });
      return res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to Update Country" });
    }
  }

  
//___---- Delete Country----___

async function deleteCountry(req, res) {
    try {
      const CountryId = req.params.id;
      const deleted = await Country_C.findByIdAndDelete(CountryId);
      if (!deleted) return res.status(404).json({ message: `Failed to Delete Country because .It is not Found` });
      return res.status(200).json(deleted);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: `Failed to delete Country` });
    }
  }
  module.exports = {
    getAllCountries,
    getCountry,
    addCountry,
    updateCountry,
    deleteCountry
  }

