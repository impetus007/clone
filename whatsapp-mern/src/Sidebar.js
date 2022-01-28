import React from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import { Avatar, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVersion from "@mui/icons-material/MoreVert";
import { SearchOutlined } from "@mui/icons-material";
import Sidebar_chat from "./Sidebar_chat";
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <avatar src="https://media-exp1.licdn.com/dms/image/C5603AQHIjW-qWus5Jg/profile-displayphoto-shrink_400_400/0/1602911997708?e=1645660800&v=beta&t=e9YEFHnO1lWXDEIX36WmJ6jhtpfOAzed2U8u18djsic" />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVersion />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="Sidebar_chat">
        <Sidebar_chat />
        <Sidebar_chat />
        <Sidebar_chat />
      </div>
    </div>
  );
}

export default Sidebar;
