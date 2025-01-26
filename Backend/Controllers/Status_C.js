const Status_C = require('../Models/Status')

//___---- Get All Statuses----___

async function getAllStatuses(req, res) {
    try {
      const Status = await Status_C.find();
      return res.status(200).json(Status);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get all Statuses " });    
    }
  }
  
//___---- Get Status by Id----___

async function getStatus(req, res) {
    try {
      const id = req.params.id
      const StatusId = await Status_C.findById(id);
      return res.status(200).json(StatusId);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get Status by Id " });    
    }
  }

  
//___---- Create Status----___

async function addStatus(req, res) {
    try {
      const {name} = req.body;
      const Create_Status = await Status_C.create({name});
      res.header("location",`${req.originalUrl}/${Create_Status._id}`);
      return res.status(201).json(Create_Status);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to Add Status" });
    }
  }
  
//___---- Update Status----___

async function updateStatus(req, res) {
    try {
      const StatusId = req.params.id;
      const {name} = req.body;
      const updated=await Status_C.findByIdAndUpdate(StatusId,{name},{new:true});
      if (!updated) return res.status(404).json({ message: `Failed to Update Status because it is not found` });
      return res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to Update Status" });
    }
  }

  
//___---- Delete Status----___

async function deleteStatus(req, res) {
    try {
      const StatusId = req.params.id;
      const deleted = await Status_C.findByIdAndDelete(StatusId);
      if (!deleted) return res.status(404).json({ message: `Failed to Delete Status because .It is not Found` });
      return res.status(200).json(deleted);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: `Failed to delete Status` });
    }
  }
  module.exports = {
    getAllStatuses,
    getStatus,
    addStatus,
    updateStatus,
    deleteStatus
  }

