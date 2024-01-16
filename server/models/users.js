const mongoose = require('mongoose');

// Define User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactNumber: {
    type:String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type: String,
    enum: ['admin', 'user'],
    required: true,
  }
});

// Create User model
const User = mongoose.model('users', userSchema);

module.exports = User;