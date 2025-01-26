const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Assuming you have the Role model imported
const Role_Model = require('./Role');

const User_Schema = new Schema({
    image: {
      type: Schema.Types.String,
      required: true
    },
    name: {
      type: Schema.Types.String,
      required: true
    },
    email: {
      type: Schema.Types.String,
      required: true
    },
    password: {
      type: Schema.Types.String,
      required: true
    },
    contactNo: {
      type: Schema.Types.String,
      required: true
    },
    cityAreaId: {
      type: Schema.Types.ObjectId,
      ref: 'CityArea',
      required: true
    },
    roleId: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
    giftStore: {
      type: Schema.Types.Array,
      required: true
   },
    otp: {
      type: String,
      default: null
    },
    otpExpires: {
      type: Date,
      default: null
    },
  });
  
  // Middleware to hash the password before saving
  User_Schema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
  
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error); // Pass errors to the next middleware or error handler
    }
  });
  
  // Method to compare entered password with the hashed password
  User_Schema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  const User_Model = mongoose.model('User', User_Schema);
  module.exports = User_Model;
  