const mongoose = require("mongoose");
const dotenv = require("dotenv");
//Db connection
dotenv.config({ path: "./config.env" });
const connection_URL = process.env.CONNECTION_URL;
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
