const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userResSch");

const authenticate = async (req, res, next) => {
  try {
    const token = req.query.jwtoken;
    if (!token) {
      return res.status(400).json({ error: "User Not Verified" });
    }
    const verifyToken = jwt.verify(token, process.env.compareString);
    const user = await User.findById(verifyToken.id);
    if (!user) {
      return res.status(400).json({ error: "User Not Verified" });
    }
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = authenticate;
