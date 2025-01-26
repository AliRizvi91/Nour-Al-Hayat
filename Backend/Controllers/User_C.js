const CityArea_Model = require('../Models/CityArea');
const User_M = require('../Models/User')
const dotenv =require('dotenv')
const jwt = require("jsonwebtoken")
const {uploadOnCloudinary} = require('../Services/cloudinary')
const {sendmailer} =require('../sendMail/sendmail')
const { otpGenerator } = require('../OTP/otp');
dotenv.config()

// Role Model
const Role_Model = require('../Models/Role');

//___---- Get All Users----___

async function getAllUsers(req, res) {
  try {
      const users = await User_M.find()
          .populate('roleId') // Populating the role
          .populate('cityAreaId') // Populating the cityAreaId field

      return res.status(200).json(users);
  } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get all Users " });
  }
}
  
//___---- Get User by Id----___

async function getUser(req, res) {
  try {
    const id = req.params.id;
    console.log('Requested ID:', id); // Log the requested ID
    const UserId = await User_M.findById(id).populate('roleId').populate('cityAreaId');
    return res.status(200).json(UserId);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Failed to get User by Id" });
  }
}

  
// Token generation function
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET_KEY, {
    expiresIn: '30d',
  });
};

// Create User function
async function addUser(req, res) {
  try {
    const { name, email, password, contactNo,roleId, cityAreaId,giftStore } = req.body;
    const imageLocalPath = req.file?.path;
    
    console.log(imageLocalPath);
    

    // Check required fields
    if (!imageLocalPath || !name || !email || !password || !contactNo|| !cityAreaId) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    // Upload image to Cloudinary
    const uploadedImage = await uploadOnCloudinary(imageLocalPath);
    if (!uploadedImage) {
      return res.status(400).json({ message: "Image is not uploaded to Cloudinary" });
    }

    // Check if user already exists
    const userExists = await User_M.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: 'User already exists' }); // Changed to 409 Conflict
    }

    // Get default role
    const defaultRole = await Role_Model.findOne({ name: 'User' });
    if (!defaultRole) {
      return res.status(500).json({ message: 'Default role not found' });
    }
    

    // Create new user
    const createUser = await User_M.create({
      image: uploadedImage, // Use uploaded image URL
      name,
      email,
      password, // Consider hashing the password before storing
      contactNo,
      giftStore,
      cityAreaId,
      roleId: roleId? roleId: defaultRole._id, // Set default role
    });

    // Generate token for the new user
    const token = generateToken(createUser._id, defaultRole.name); // Use the role name if needed

    // Set location header and respond
    res.header("Location", `${req.originalUrl}/${createUser._id}`);
    return res.status(201).json({
      user: createUser,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to add user" });
  }
}


  
//___---- Update User----___

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const imageLocalPath = req.file?.path;
    const {
      name,
      email,
      password,
      contactNo,
      cityAreaId,
      giftStore,
      } =req.body;

      // console.log("GiftStore",giftStore);
      console.log("id",id);
      console.log("imageLocalPath",imageLocalPath);
      

      const AdminRole = await Role_Model.findOne({ name: 'Admin' });
       // Get default role
    const UserRole = await Role_Model.findOne({ name: 'User' });
    if (!UserRole || !AdminRole) {
      return res.status(500).json({ message: 'Default role not found' });
    }

    
    
    // Find the user first to ensure it exists
    const user = await User_M.findById(id);
    if (!user) {
      return res.status(404).json({ message: `User not found` });
    }

    let imageUrl = user.image; // Keep the existing image URL if no new image is uploaded

    if (imageLocalPath) {
      // Upload the new image to Cloudinary
      const uploadedImage = await uploadOnCloudinary(imageLocalPath);
      if (!uploadedImage) {
        return res.status(500).json({ msg: "Image upload failed" });
      }
      imageUrl = uploadedImage; // Update the image URL with the new Cloudinary URL
    }

    console.log(imageUrl);
    
    // Update the user with the new image URL
    const updateFeild = {
      image : imageUrl,
      name,
      email,
      password, // Consider hashing the password before storing
      contactNo,
      cityAreaId,
      giftStore,
      roleId: user.roleId?.name==="User"?UserRole._id:AdminRole._id // Set default role
    }

    const updatedUser = await User_M.findByIdAndUpdate(
      id,
      updateFeild,
      { new: true }
    );
    console.log(updatedUser);
    

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update user" });
  }
};

  
//___---- Delete User----___

async function deleteUser(req, res) {
    try {
      const UserId = req.params.id;
      const deleted = await User_M.findByIdAndDelete(UserId);
      if (!deleted) return res.status(404).json({ message: `Failed to Delete User because .It is not Found` });
      return res.status(200).json(deleted);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: `Failed to delete User` });
    }
  }



//___---- Login----___
const Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields' });
  }

  try {
      const user = await User_M.findOne({ email });
      if (user && (await user.matchPassword(password))) {
          const otp = otpGenerator();
          const otpExpires = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes

          await User_M.findOneAndUpdate(
              { email },
              { otp, otpExpires },
              { new: true, useFindAndModify: false }
          );

          await sendmailer(email, otp); // Send OTP via email

          // Set cookie with proper attributes
          res.cookie('authToken', otp, {
              httpOnly: true,
              secure: true, // ensure cookie is sent over HTTPS
              sameSite: 'None' // allows cross-site requests
          });

          res.json({
              message: 'OTP has been sent to your email',
              email,
          });
      } else {
          res.status(401).json({ message: 'Invalid email or password' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
};


const verifyOtp = async (req, res) => {
const { email, enteredOtp } = req.body;

try {
  const user = await User_M.findOne({ email });

  if (user && user.otp === enteredOtp && user.otpExpires > Date.now()) {
    // Clear OTP after successful verification
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    // Generate token with user ID and role
    const token = generateToken(user._id, user.roleId);

    res.json({ token });
  } else {
    res.status(400).json({ message: 'Invalid or expired OTP' });
  }
} catch (error) {
  res.status(500).json({ message: 'Server error' });
}
};




  module.exports = {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    Login,
    verifyOtp
  }

