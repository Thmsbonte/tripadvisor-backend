const User = require("../models/User");

const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const user = await User.findOne({
        token: req.headers.authorization.replace("Bearer ", ""),
      });
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({
          message: "unauthorized",
        });
      }
    } else {
      res.status(400).json({
        message: "unauthorized",
      });
    }
  } catch (error) {
    resizeBy.status(400).json({
      error: error.message,
    });
  }
};

module.exports = isAuthenticated;
