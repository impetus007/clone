const express = require("express");
const router = express.Router();
require("../database/connection");

const User = require("../model/userScema");

//sign up
router.post("/signup", async (req, res) => {
  //   console.log(req.body);
  //   req.json({ message: req.body });
  const { name, email, occupation, password } = req.body;
  if (!name || !email || !occupation || !password) {
    res.status(422).json({ error: "plz filled the remaing property!" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Oops Email already exist" });
    } else {
      const user = new User({
        name,
        email,
        occupation,
        password,
      });
      await user.save();

      res
        .status(201)
        .json({ message: "congratulations you registerd succesfully" });
    }
  } catch (err) {
    console.log(err);
  }
  // login Here
  router.post("/signin", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "pls filled the input" });
      }
      const userlogin = await User.findOne({ email: email });
      // console.log(userlogin);
      if (userlogin) {
        res.json({ message: "user login successfully" });
      } else {
        res.status(400).json({ error: "user error" });
      }
    } catch (err) {
      console.log(err);
    }
  });
});

module.exports = router;
