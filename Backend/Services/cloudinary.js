const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECERET_KEY // Click 'View Credentials' below to copy your API secret
});

// Upload an image

// Function to upload file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    try {
      if (!localFilePath) return null;
      const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" });
      fs.unlinkSync(localFilePath); // Remove the locally saved temporary file
      console.log('File has been Uploaded', response.url);
      return response.url;
    } catch (error) {
      console.error('Upload Error:', error);
      fs.unlinkSync(localFilePath); // Clean up the temporary file on error
      return null;
    }
  };
  
  module.exports = { uploadOnCloudinary };