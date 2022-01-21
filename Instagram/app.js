import express from "express";
import mongoose from "mongoose";
import("./models/user.js"); //when you used type:module in package.json then alway import file with .js extension otherwise it will show you error that cannnot find module/file

const app = express();
const PORT = process.env.PORT || 3000;

//Database connection
const connection_URL =
  "mongodb+srv://impetus:impetusInstagram@cluster0.m0o8y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(
  connection_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("connected to MongoDb!");
  }
);

//Listen to Port

app.listen(PORT, function () {
  console.log(`server is running at ${PORT}`);
});
