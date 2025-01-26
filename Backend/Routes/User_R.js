const express = require('express')
const User_R = express.Router();
const {upload} = require('../middleware/multer.middleware')
const {protect} = require('../middleware/authMiddleware')

const {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    Login,
    verifyOtp
  } = require('../Controllers/User_C')

  User_R.route('/')
  .get(getAllUsers)
  
  User_R.route('/signup')
  .post(upload.single('image'),addUser)
  
  // Define the profile route first to avoid conflicts
User_R.get('/profile', protect, (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to retrieve profile" });
  }
  });


  User_R.route('/:id')
  .get(getUser)
  .put(upload.single('image'),updateUser)
  .delete(deleteUser)

  User_R.route('/login')
  .post(Login)

  
  User_R.post('/verifyotp', verifyOtp);


module.exports = User_R


