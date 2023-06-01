const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect(process.env.mongoAtlasUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully Connected to mongoDbAtlas");
  })
  .catch(() => {
    console.log("Connection Terminated");
  });

module.exports = mongoose;
