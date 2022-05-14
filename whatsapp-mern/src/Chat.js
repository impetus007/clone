import {
  AttachFile,
  InsertEmoticon,
  Mic,
  SearchOutlined,
} from "@mui/icons-material";
import MoreVert from "@mui/icons-material/MoreVert";
import { Avatar, IconButton } from "@mui/material";
import React, { useState } from "react";
import "./Chat.css";
import axios from "./axios";
// import { const [state, setstate] = useState(initialState)}

function Chat({ messages }) {
  const [input, setInput] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post("/messages/new", {
      message: input,
      name: "Demo App",
      timestamp: "just now!",
      received: false,
    });
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <avatar />
        <div className="chat_headerinfo">
          <h3>Room Name</h3>
          <p>last seen at ...</p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <attachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message) => (
          <p className={`chat_message ${message.received} && "chat_reciever"`}>
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp"> {message.timestamp}</span>
          </p>
        ))}

        {/* <p className="chat_message chat_reciever">
          <span className="chat_name">vishal</span>
          This is a message
          <span className="chat_timestamp"> {new Date().toUTCString()}</span>
        </p>

        <p className="chat_message">
          <span className="chat_name">vishal</span>
          This is a message
          <span className="chat_timestamp"> {new Date().toUTCString()}</span>
        </p> */}
      </div>
      <div className="chat_footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
