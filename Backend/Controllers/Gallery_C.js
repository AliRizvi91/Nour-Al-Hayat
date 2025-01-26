const Gallery_M = require('../Models/Gallery')
const {uploadOnCloudinary} = require('../Services/cloudinary')

//___---- Get All Gallerys----___

async function getAllGallerys(req, res) {
    try {
      const Gallerys = await Gallery_M.find().populate("hotelId");
      return res.status(200).json(Gallerys);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get all Gallerys " });    
    }
  }
  
//___---- Get Gallery by Id----___

async function getGallery(req, res) {
    try {
      const id = req.params.id
      const GalleryId = await Gallery_M.findById(id).populate("hotelId");
      return res.status(200).json(GalleryId);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get Gallery by Id " });    
    }
  }

  
//___---- Create Gallery----___

async function addGallery(req, res) {
    try {
      const {hotelId} = req.body;

      const imageLocalPath = req.file?.path;
      console.log("imageLocalPath",imageLocalPath);
      console.log("hotelId",hotelId);
      

    // Check required fields
    if (!imageLocalPath || !hotelId) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    // Upload image to Cloudinary
    const uploadedImage = await uploadOnCloudinary(imageLocalPath);
    if (!uploadedImage) {
      return res.status(400).json({ message: "Image is not uploaded to Cloudinary" });
    }


      const Create_Gallery = await Gallery_M.create({
        image: uploadedImage,
        hotelId});
      res.header("location",`${req.originalUrl}/${Create_Gallery._id}`);
      return res.status(200).json(Create_Gallery);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to Add Gallery" });
    }
  }
  
//___---- Update Gallery----___

async function updateGallery(req, res) {
    try {
      const GalleryId = req.params.id;
      const {image,name,explaination} = req.body;
      const updated=await Gallery_M.findByIdAndUpdate(GalleryId,{image,name,explaination},{new:true});
      if (!updated) return res.status(404).json({ message: `Failed to Update Gallery because it is not found` });
      return res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to Update Gallery" });
    }
  }

  
//___---- Delete Gallery----___

async function deleteGallery(req, res) {
    try {
      const GalleryId = req.params.id;
      const deleted = await Gallery_M.findByIdAndDelete(GalleryId);
      if (!deleted) return res.status(404).json({ message: `Failed to Delete Gallery because .It is not Found` });
      return res.status(200).json(deleted);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: `Failed to delete Gallery` });
    }
  }
  module.exports = {
    getAllGallerys,
    getGallery,
    addGallery,
    updateGallery,
    deleteGallery
  }

