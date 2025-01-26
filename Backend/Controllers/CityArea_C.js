const CityArea_C = require('../Models/CityArea')

//___---- Get All CityAreas----___

async function getAllCityAreas(req, res) {
    try {
      const CityArea = await CityArea_C.find().populate('cityId');
      return res.status(200).json(CityArea);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get all CityAreas " });    
    }
  }
  
//___---- Get CityArea by Id----___

async function getCityArea(req, res) {
    try {
      const id = req.params.id
      const CityAreaId = await CityArea_C.findById(id).populate('cityId');
      return res.status(200).json(CityAreaId);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get CityArea by Id " });    
    }
  }

  
//___---- Create CityArea----___

async function addCityArea(req, res) {
    try {
      const {name,cityId} = req.body;
      const Create_CityArea = await CityArea_C.create({name,cityId});
      res.header("location",`${req.originalUrl}/${Create_CityArea._id}`);
      return res.status(201).json(Create_CityArea);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to Add CityArea" });
    }
  }
  
//___---- Update CityArea----___

async function updateCityArea(req, res) {
    try {
      const CityAreaId = req.params.id;
      const {name,cityId} = req.body;
      const updated=await CityArea_C.findByIdAndUpdate(CityAreaId,{name,cityId},{new:true});
      if (!updated) return res.status(404).json({ message: `Failed to Update CityArea because it is not found` });
      return res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to Update CityArea" });
    }
  }

  
//___---- Delete CityArea----___

async function deleteCityArea(req, res) {
    try {
      const CityAreaId = req.params.id;
      const deleted = await CityArea_C.findByIdAndDelete(CityAreaId);
      if (!deleted) return res.status(404).json({ message: `Failed to Delete CityArea because .It is not Found` });
      return res.status(200).json(deleted);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: `Failed to delete CityArea` });
    }
  }
  module.exports = {
    getAllCityAreas,
    getCityArea,
    addCityArea,
    updateCityArea,
    deleteCityArea
  }

