const express = require("express"); //1
const mongoose = require("mongoose"); //2
const dotenv = require("dotenv"); //3
const app = express(); //1

const PORT = process.env.PORT || 8000;

require("./database/connection");

app.use(express.json());

//link the router files
app.use(require("./routes/auth"));

//middleware :- use for pehle ye work krege isko verify kiya jayega uske baad function aage work krega
// app.get("/", (req, res, next) =>{
//   console.log("hello i m middleware");
//   next();
// })

app.get("/", (req, res) => {
  res.send("hi Impetus !");
});
//1

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
//1
