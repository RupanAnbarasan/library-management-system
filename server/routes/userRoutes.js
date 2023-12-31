const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const mongoose = require("mongoose");

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user by username
router.get("/username/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (user) {
      res.json(user.id);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// autocomplete
router.get("/searchUser/autocompleteSearch", async (req, res) => {
  try {
    const { searchTerm } = req.query;
    // Perform a case-insensitive search for books with a name starting with the searchTerm
    const users = await User.find({
      username: { $regex: `^${searchTerm}`, $options: "i" },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new user
router.post("/register", async (req, res) => {
  const { username, name, email, contactNumber, password, role } =
    req.body.credentials;
  const newUser = new User({
    username,
    name,
    email,
    contactNumber,
    password,
    role,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login (validate user credentials)
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({ message: "Login successful", role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
