const Events_M = require('../Models/Event')
const {uploadOnCloudinary} = require('../Services/cloudinary')

//___---- Get All Eventss----___

async function getAllEvents(req, res) {
    try {
      const Events = await Events_M.find();
      return res.status(200).json(Events);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get all Events " });    
    }
  }
  
//___---- Get Events by Id----___

async function getEvent(req, res) {
    try {
      const id = req.params.id
      const EventsId = await Events_M.findById(id);
      return res.status(200).json(EventsId);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get Events by Id " });    
    }
  }

  
//___---- Create Events----___

async function addEvent(req, res) {
    try {
      const {title,description,date,time,location,price,maxAttendees} = req.body;

      const imageLocalPath = req.file?.path;

    // Check required fields
    if (!imageLocalPath||!title||!description||!date||!time||!location||!price||!maxAttendees) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    // Upload image to Cloudinary
    const uploadedImage = await uploadOnCloudinary(imageLocalPath);
    if (!uploadedImage) {
      return res.status(400).json({ message: "Image is not uploaded to Cloudinary" });
    }


      const Create_Events = await Events_M.create({
        image: uploadedImage,
        title,description,date,time,location,price,maxAttendees});
      res.header("location",`${req.originalUrl}/${Create_Events._id}`);
      return res.status(200).json(Create_Events);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to Add Events" });
    }
  }
  
//___---- Update Events----___

async function updateEvent(req, res) {
    try {
      const EventsId = req.params.id;
      const imageLocalPath = req.file?.path; // Get image from request file
      
      // Ensure image is provided or handle accordingly
      let image;
      if (imageLocalPath) {
          image = await uploadOnCloudinary(imageLocalPath); // Function to upload to Cloudinary
      }
      
      
      const {title,description,date,time,location,price,maxAttendees} = req.body;
      // Validate all required fields
      if (!title || !description || !date || !time || !location || !price || !maxAttendees) {
        return res.status(400).json({ message: 'All fields are required' });
    }
      console.log("Backend Update",title,description,date,time,location,price,maxAttendees);
      const updated=await Events_M.findByIdAndUpdate(EventsId,{
        image: image,
        title,description,date,time,location,price,maxAttendees},{new:true});

      if (!updated) return res.status(404).json({ message: `Failed to Update Events because it is not found` });
      return res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to Update Events" });
    }
  }

  
//___---- Delete Events----___

async function deleteEvent(req, res) {
    try {
      const EventsId = req.params.id;
      const deleted = await Events_M.findByIdAndDelete(EventsId);
      if (!deleted) return res.status(404).json({ message: `Failed to Delete Events because .It is not Found` });
      return res.status(200).json(deleted);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: `Failed to delete Events` });
    }
  }
  module.exports = {
    getAllEvents,
    getEvent,
    addEvent,
    updateEvent,
    deleteEvent
  }

