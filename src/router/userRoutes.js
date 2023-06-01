const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userResSch");
const router = express.Router();
router.get("/", (req, res) => {
  res.send("Hello from router");
});

//api to signup

router.post("/signup", async (req, res) => {
  try {
    const { email, password, name, age } = req.body;
    const checkEmail = await User.find({ email });
    // console.log(checkEmail);
    if (checkEmail.length > 0) {
      return res.status(400).json({ error: "Email Already Exists" });
    }
    const securePass = await bcrypt.hash(password, 12);
    const upload = new User({ email, password: securePass, name, age });
    const saveData = await upload.save();
    if (saveData) {
      res.status(200).send(saveData);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

//api login call

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkEmail = await User.findOne({ email });
    // console.log(checkEmail);
    if (!checkEmail) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    const comparePass = await bcrypt.compare(password, checkEmail.password);
    // res.status(400).send("hello");
    if (comparePass) {
      const accessToken = jwt.sign(
        { id: checkEmail._id },
        process.env.compareString,
        {
          expiresIn: "1d",
        }
      );
      const { password, ...data } = checkEmail._doc;
      return res.status(200).json({ data, jwtoken: accessToken });
    } else {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    res.send(404).send(err);
  }
});

router.put("/users/:userId", async (req, res) => {
  try {
    const id = req.params.userId;
    const updateData = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).send(updateData);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
