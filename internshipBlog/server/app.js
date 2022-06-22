const express = require("express");
const mongoose = require("mongoose");
const app = express();

const PORT = process.env.PORT || 9000;
app.use(express.json());

// connnected to mongodb

require("./database/connection");

app.use(require("./routes/auth"));

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
