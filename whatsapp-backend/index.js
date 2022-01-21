//importing
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";

//app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1322484",
  key: "deb840c5ee2733267f0a",
  secret: "9a1980ad5a07826fdee9",
  cluster: "ap2",
  useTLS: true,
});

//Middlewar
app.use(express.json());
//It should set some Header for us
app.use(cors());

//DB config
const Connection_URL =
  "mongodb+srv://admin_impetus_whatapp:adminimpetus@cluster0.bbutl.mongodb.net/whatsappdb?retryWrites=true&w=majority";
mongoose.connect(
  Connection_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB!!!");
  }
);

//print database in console
const db = mongoose.connection;
db.once("open", () => {
  console.log("DB Connected");
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();
  changeStream.on("change", (change) => {
    console.log("change", change);
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      //pusher trigger
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("error triggering Pusher");
    }
  });
});

//????

//api routes
app.get("/", (req, res) => res.status(200).send("hello vishal"));

//checkout all messages
app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//post new messages
app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;
  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

//listen
app.listen(port, () => console.log(`localhost running on port on : ${port}`));
