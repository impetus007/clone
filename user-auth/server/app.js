const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const PORT = process.env.PORT || 8000;

require("./database/connection");

app.use(express.json());
app.use(require("./routes/auth"));

app.get("/", (req, res) => {
  res.send("hi Impetus !");
});

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
