const express = require("express");
const router = express.Router();

// AUTHENTICATION INITIALIZATION
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

// MODELS IMPORT
const User = require("../models/User");

// ROUTES
router.post("/user/signup", async (req, res) => {
  try {
    if ((req.fields.username, req.fields.mail, req.fields.password)) {
      const salt = uid2(64);
      const token = uid2(64);
      const hash = SHA256(req.fields.password + salt).toString(encBase64);

      const user = new User({
        username: req.fields.username,
        mail: req.fields.mail,
        credentials: {
          hash: hash,
          salt: salt,
          token: token,
        },
        message: req.fields.message,
      });
      await user.save();
      res.status(200).json({
        message: `Inscription réussie, bienvenue ${req.fields.username}`,
        username: user.username,
      });
    } else {
      res.status(400).json({
        error: "Missing parameters",
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

router.post("/user/login", async (req, res) => {
  if (req.fields.mail && req.fields.password) {
    try {
      const user = await User.findOne({
        mail: req.fields.mail,
      });
      if (user) {
        const hash = SHA256(
          req.fields.password + user.credentials.salt
        ).toString(encBase64);
        if (hash === user.credentials.hash) {
          res.status(200).json({
            message: `Connexion réussie, bienvenu(e) ${user.username}`,
            username: user.username,
          });
        } else {
          res.status(400).json({
            message: "Unauthorized",
          });
        }
      } else {
        res.status(400).json({
          message: "Unauthorized",
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  } else {
    res.status(400).json({
      error: "Missing parameters",
    });
  }
});

module.exports = router;
