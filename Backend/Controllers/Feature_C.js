const Feature_M = require('../Models/Features')
const {uploadOnCloudinary} = require('../Services/cloudinary')

//___---- Get All Features----___

async function getAllFeatures(req, res) {
    try {
      const Features = await Feature_M.find();
      return res.status(200).json(Features);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get all Features " });    
    }
  }
  
//___---- Get Feature by Id----___

async function getFeature(req, res) {
    try {
      const id = req.params.id
      const FeatureId = await Feature_M.findById(id);
      return res.status(200).json(FeatureId);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get Feature by Id " });    
    }
  }

  
//___---- Create Feature----___

async function addFeature(req, res) {
    try {
      const {name,explaination} = req.body;

      const imageLocalPath = req.file?.path;

    // Check required fields
    if (!imageLocalPath || !name || !explaination) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    // Upload image to Cloudinary
    const uploadedImage = await uploadOnCloudinary(imageLocalPath);
    if (!uploadedImage) {
      return res.status(400).json({ message: "Image is not uploaded to Cloudinary" });
    }


      const Create_Feature = await Feature_M.create({
        image: uploadedImage
        ,name,explaination});
      res.header("location",`${req.originalUrl}/${Create_Feature._id}`);
      return res.status(201).json(Create_Feature);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to Add Feature" });
    }
  }
  
//___---- Update Feature----___

async function updateFeature(req, res) {
    try {
      const FeatureId = req.params.id;
      const {image,name,explaination} = req.body;
      const updated=await Feature_M.findByIdAndUpdate(FeatureId,{image,name,explaination},{new:true});
      if (!updated) return res.status(404).json({ message: `Failed to Update Feature because it is not found` });
      return res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to Update Feature" });
    }
  }

  
//___---- Delete Feature----___

async function deleteFeature(req, res) {
    try {
      const FeatureId = req.params.id;
      const deleted = await Feature_M.findByIdAndDelete(FeatureId);
      if (!deleted) return res.status(404).json({ message: `Failed to Delete Feature because .It is not Found` });
      return res.status(200).json(deleted);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: `Failed to delete Feature` });
    }
  }
  module.exports = {
    getAllFeatures,
    getFeature,
    addFeature,
    updateFeature,
    deleteFeature
  }

