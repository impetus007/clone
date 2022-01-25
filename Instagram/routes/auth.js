// import express from "express";
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("impetus");
});

router.post("/signup", (req, res) => {
  console.log(req.body);
});

module.exports = router;
