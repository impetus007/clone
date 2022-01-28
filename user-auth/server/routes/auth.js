const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("../database/connection");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("hi from router js");
});

// promises
// router.post("/register", (req, res) => {
//   const { name, email, phone, occupation, password, cpassword } = req.body;

//   if (!name || !email || !phone || !occupation || !password || !cpassword) {
//     return res.status(422).json({ error: "plz fill the required property !" });
//   }
//   User.findOne({ email: email })
//     .then((userexist) => {
//       if (userexist) {
//         return res
//           .status(422)
//           .json({ error: "oops! this email already exist." });
//       }
//       const user = new User({
//         name,
//         email,
//         phone,
//         occupation,
//         password,
//         cpassword,
//       });
//       user
//         .save()
//         .then(() => {
//           res.status(201).json({ message: "user registered successfully" });
//         })
//         .catch((error) =>
//           res.status(500).json({ error: "try again server failed to register" })
//         );
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// Async-await
router.post("/register", async (req, res) => {
  const { name, email, phone, occupation, password, cpassword } = req.body;
  if (!name || !email || !phone || !occupation || !password || !cpassword) {
    res.status(422).json({ error: "plz filled the remaing property!" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Oops Email already exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "password are not matching!" });
    } else {
      const user = new User({
        name,
        email,
        phone,
        occupation,
        password,
        cpassword,
      });
      await user.save();

      res
        .status(201)
        .json({ message: "Congratulations you registered succesfully!" });
    }
  } catch (err) {
    console.log(err);
  }
});

//login here
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "plz filled the data" });
    }
    const userLogin = await User.findOne({ email: email });
    // console.log(userLogin);
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      const token = await userLogin.generateAuthToken();
      console.log(token);

      if (!isMatch) {
        res.status(400).json({ error: "user error" });
      } else {
        res.json({ message: "user signin successfully!" });
      }
    } else {
      res.status(400).json({ error: "user error" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
