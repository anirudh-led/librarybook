const User = require("../models/userModel");
const mongoose = require("mongoose");

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Get a single user
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "No such user" });
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// Add a user
const addUser = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.create({ username });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  try {
    const user = await User.findOneAndDelete({ _id: id });

    if (!user) {
      return res.status(404).json({ error: "No such user" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

module.exports = {
  getUser,
  getUsers,
  addUser,
  deleteUser,
};
