const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const protect = async (req, res, next) => {
  let token;

  // Check if Authorization header is present
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // Find the user by ID and exclude the password field
      req.user = await User.findById(decoded.id).select('-password')
      .populate("roleId").populate('cityAreaId');

      if (!req.user) {
        return res.status(404).json({ message: 'User not found' });
      }

      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};



// Authorization Middleware (get and return a user request) 
const authorization = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role.name !== "Admin") {
      res.status(400)
      throw new Error("Forbidden, You are not authorize");
    }else
    req.user = user;

    next();
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {protect,authorization};
