const express = require("express");
const router = express.Router();

const User = require("../models/User");
const uid2 = require("uid2");
const CryptoJS = require("crypto-js");

// SIGNUP
router.post("/user/signup", async (req, res) => {
  try {
    const { email, password, pseudo, firstname, lastname } = req.body;

    // Vérif
    if (!email || !password || !pseudo) {
      return res.status(400).json({ message: "Missing parameters" });
    }

    // Check exist
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash
    const salt = uid2(16);
    const hash = CryptoJS.SHA256(password + salt).toString();

    // Token
    const token = uid2(32);

    const newUser = new User({
      email,
      pseudo,
      firstname,
      lastname,
      token,
      hash,
      salt,
    });

    await newUser.save();

    res.status(200).json({
      _id: newUser._id,
      email: newUser.email,
      pseudo: newUser.pseudo,
      token: newUser.token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// LOGIN
router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing parameters" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const newHash = CryptoJS.SHA256(password + user.salt).toString();

    if (newHash !== user.hash) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).json({
      _id: user._id,
      email: user.email,
      pseudo: user.pseudo,
      token: user.token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
