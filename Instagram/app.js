// import express from "express";
const express = require("express");
// import mongoose from "mongoose";
const mongoose = require("mongoose");
// import router from "./routes/auth.js";
// import("./models/user.js"); //when you used type:module in package.json then alway import file with .js extension otherwise it will show you error that cannnot find module/file
// import router from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 3000;

//Database connection


app.use(express.json());

app.use(require("./routes/auth"));
// app.get("/", (req, res) => {
//   res.send("impetus hi what r u doing buddy!");
// });

// app.post("signup", (req, res) => {
//   console.log(req.body);
// });

//Listen to Port

app.listen(PORT, function () {
  console.log(`server is running at ${PORT}`);
});
