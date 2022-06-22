const mongoose = require("mongoose");

const connectionUrl =
  "mongodb+srv://impetus_internship:impetusdemon@cluster0.d8azjyz.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(
  connectionUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },

  (err) => {
    if (err) throw err;
    console.log("successfully connected to mongodb");
  }
);

module.exports = connectionUrl;
