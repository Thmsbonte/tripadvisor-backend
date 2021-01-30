const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: String,
  mail: String,
  credentials: {
    hash: String,
    salt: String,
    token: String,
  },
  message: String,
});

module.exports = User;
