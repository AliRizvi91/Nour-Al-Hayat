const Contact_C = require('../Models/Contact')

//___---- Get All Contacts----___

async function getAllContacts(req, res) {
    try {
      const Contact = await Contact_C.find();
      return res.status(200).json(Contact);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get all Contacts " });    
    }
  }
  
//___---- Get Contact by Id----___

async function getContact(req, res) {
    try {
      const id = req.params.id
      const ContactId = await Contact_C.findById(id);
      return res.status(200).json(ContactId);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get Contact by Id " });    
    }
  }

  
//___---- Create Contact----___

async function addContact(req, res) {
    try {
      const {Message,Name,Email,Subject} = req.body;
      const Create_Contact = await Contact_C.create({Message,Name,Email,Subject});
      res.header("location",`${req.originalUrl}/${Create_Contact._id}`);
      return res.status(201).json(Create_Contact);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to Add Contact" });
    }
  }
  
//___---- Update Contact----___

async function updateContact(req, res) {
    try {
      const ContactId = req.params.id;
      const {Message,Name,Email,Subject} = req.body;
      const updated=await Contact_C.findByIdAndUpdate(ContactId,{Message,Name,Email,Subject},{new:true});
      if (!updated) return res.status(404).json({ message: `Failed to Update Contact because it is not found` });
      return res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to Update Contact" });
    }
  }

  
//___---- Delete Contact----___

async function deleteContact(req, res) {
    try {
      const ContactId = req.params.id;
      const deleted = await Contact_C.findByIdAndDelete(ContactId);
      if (!deleted) return res.status(404).json({ message: `Failed to Delete Contact because .It is not Found` });
      return res.status(200).json(deleted);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: `Failed to delete Contact` });
    }
  }
  module.exports = {
    getAllContacts,
    getContact,
    addContact,
    updateContact,
    deleteContact
  }

