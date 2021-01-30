const express = require("express");
const router = express.Router();

// AUTHENTICATION INITIALIZATION
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

// MODELS IMPORT
const User = require("../models/User");

// ROUTES
router.post("/user/login", async (req, res) => {
  try {
    const salt = uid2(64);
    const token = uid2(64);
    const hash = SHA256(salt + req.fields.password).toString(encBase64);

    const user = new User({
      username: req.fields.username,
      mail: req.fields.mail,
      message: req.fields.message,
      credential: {
        hash: hash,
        salt: salt,
        token: token,
      },
    });

    await user.save();

    res.status(200).json({
      message: `Login succeeded, welcome ${req.fields.username}`,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

module.exports = router;
