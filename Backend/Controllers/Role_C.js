const Role_C = require('../Models/Role')

//___---- Get All Roles----___

async function getAllRoles(req, res) {
    try {
      const Role = await Role_C.find();
      return res.status(200).json(Role);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get all Roles " });    
    }
  }
  
//___---- Get Role by Id----___

async function getRole(req, res) {
    try {
      const id = req.params.id
      const RoleId = await Role_C.findById(id);
      return res.status(200).json(RoleId);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get Role by Id " });    
    }
  }

  
//___---- Create Role----___

async function addRole(req, res) {
    try {
      const {Name} = req.body;
      const Create_Role = await Role_C.create({Name});
      res.header("location",`${req.originalUrl}/${Create_Role._id}`);
      return res.status(201).json(Create_Role);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to Add Role" });
    }
  }
  
//___---- Update Role----___

async function updateRole(req, res) {
    try {
      const RoleId = req.params.id;
      const {Name} = req.body;
      const updated=await Role_C.findByIdAndUpdate(RoleId,{Name},{new:true});
      if (!updated) return res.status(404).json({ message: `Failed to Update Role because it is not found` });
      return res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to Update Role" });
    }
  }

  
//___---- Delete Role----___

async function deleteRole(req, res) {
    try {
      const RoleId = req.params.id;
      const deleted = await Role_C.findByIdAndDelete(RoleId);
      if (!deleted) return res.status(404).json({ message: `Failed to Delete Role because .It is not Found` });
      return res.status(200).json(deleted);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: `Failed to delete Role` });
    }
  }
  module.exports = {
    getAllRoles,
    getRole,
    addRole,
    updateRole,
    deleteRole
  }

