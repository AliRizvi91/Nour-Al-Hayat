const Province_C = require('../Models/Province')

//___---- Get All Provinces----___

async function getAllProvinces(req, res) {
    try {
      const Province = await Province_C.find().populate('CoutryId');
      return res.status(200).json(Province);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get all Provinces " });    
    }
  }
  
//___---- Get Province by Id----___

async function getProvince(req, res) {
    try {
      const id = req.params.id
      const ProvinceId = await Province_C.findById(id).populate('CoutryId');
      return res.status(200).json(ProvinceId);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get Province by Id " });    
    }
  }

  
//___---- Create Province----___

async function addProvince(req, res) {
    try {
      const {Name,CoutryId} = req.body;
      const Create_Province = await Province_C.create({Name,CoutryId});
      res.header("location",`${req.originalUrl}/${Create_Province._id}`);
      return res.status(201).json(Create_Province);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to Add Province" });
    }
  }
  
//___---- Update Province----___

async function updateProvince(req, res) {
    try {
      const ProvinceId = req.params.id;
      const {Name,CoutryId} = req.body;
      const updated=await Province_C.findByIdAndUpdate(ProvinceId,{Name,CoutryId},{new:true});
      if (!updated) return res.status(404).json({ message: `Failed to Update Province because it is not found` });
      return res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to Update Province" });
    }
  }

  
//___---- Delete Province----___

async function deleteProvince(req, res) {
    try {
      const ProvinceId = req.params.id;
      const deleted = await Province_C.findByIdAndDelete(ProvinceId);
      if (!deleted) return res.status(404).json({ message: `Failed to Delete Province because .It is not Found` });
      return res.status(200).json(deleted);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: `Failed to delete Province` });
    }
  }
  module.exports = {
    getAllProvinces,
    getProvince,
    addProvince,
    updateProvince,
    deleteProvince
  }

