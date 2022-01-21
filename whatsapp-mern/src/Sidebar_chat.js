import React from "react";
import "./Sidebar_chat.css";
import { Avatar } from "@mui/material";

function Sidebar_chat() {
  return (
    <div className="sidebar_chat">
      <div className="Avatar">
        <Avatar />
      </div>

      <div className="Sidebarchat_info">
        <h2>Room Name</h2>
        <p>This is a last message</p>
      </div>
    </div>
  );
}

export default Sidebar_chat;
