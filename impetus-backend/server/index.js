const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(cors());
//Db connection
//Database connection
// const connection_URL =
//   "mongodb+srv://impetus:impetusInstagram@cluster0.m0o8y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// mongoose.connect(
//   connection_URL,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   (err) => {
//     if (err) throw err;
//     console.log("connected to MongoDb!");
//   }
// );

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
