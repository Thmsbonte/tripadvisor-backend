const express = require("express");
const formidable = require("express-formidable");
const app = express();
app.use(formidable());
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
require("dotenv").config();

// DB CONNECTION
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

// ROUTES IMPORT
const userRoutes = require("./routes/user");
app.use(userRoutes);

app.all("*", (req, res) => {
  res.status(200).json({
    message: "This route doesn't exist",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
