const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const Authentication = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens:token": token,
    });

    if (!rootUser) {
      throw new Error("user not found");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch {
    req.status(401).send("unauthorised : NO token provided");
    console.log(err);
  }
};

module.exports = Authentication;
