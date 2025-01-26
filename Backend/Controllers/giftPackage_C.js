const Gift_M = require('../Models/GiftPackage')
const {uploadOnCloudinary} = require('../Services/cloudinary')

//___---- Get All Gifts----___

async function getAllGifts(req, res) {
    try {
      const Gifts = await Gift_M.find();
      return res.status(200).json(Gifts);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get all Gifts " });    
    }
  }
  
//___---- Get Gift by Id----___

async function getGift(req, res) {
    try {
      const id = req.params.id
      const GiftId = await Gift_M.findById(id);
      return res.status(200).json(GiftId);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get Gift by Id " });    
    }
  }

  
//___---- Create Gift----___

async function addGift(req, res) {
  try {
    const { description, price } = req.body;
    const imageLocalPaths = req.files?.map(file => file.path); // Capture file paths
    console.log("imageLocalPaths",imageLocalPaths);
    

    if (!imageLocalPaths || imageLocalPaths.length === 0 || !description || !price) {
      return res.status(400).json({ message: 'Please fill in all fields and upload at least one image' });
    }

    // Upload images to Cloudinary or another service
    const uploadedImages = await Promise.all(imageLocalPaths.map(uploadOnCloudinary));

    if (uploadedImages.some(image => !image)) {
      return res.status(400).json({ message: "One or more images failed to upload" });
    }

    const createdGift = await Gift_M.create({
      giftImages: uploadedImages,
      description,
      price,
    });

    res.status(200).json(createdGift);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add Gift" });
  }
}


  
//___---- Update Gift----___

async function updateGift(req, res) {
    try {
      const GiftId = req.params.id;
      const imageLocalPaths = req.files?.map(file => file.path); // Capture file paths

      // Upload images to Cloudinary or another service
    const uploadedImages = await Promise.all(imageLocalPaths.map(uploadOnCloudinary));
      const {description , price} = req.body;
      const updated=await Gift_M.findByIdAndUpdate(GiftId,{giftImages:uploadedImages ,description , price},{new:true});
      if (!updated) return res.status(404).json({ message: `Failed to Update Gift because it is not found` });
      return res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to Update Gift" });
    }
  }

  
//___---- Delete Gift----___

async function deleteGift(req, res) {
    try {
      const GiftId = req.params.id;
      const deleted = await Gift_M.findByIdAndDelete(GiftId);
      if (!deleted) return res.status(404).json({ message: `Failed to Delete Gift because .It is not Found` });
      return res.status(200).json(deleted);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: `Failed to delete Gift` });
    }
  }
  module.exports = {
    getAllGifts,
    getGift,
    addGift,
    updateGift,
    deleteGift
  }

