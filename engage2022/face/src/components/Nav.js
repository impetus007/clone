import React from "react";
import "./Nav.css";
import Button from "@mui/material/Button";

function Nav() {
  return (
    <div className="nav">
      <div className="logo">
        <img alt="logo" />
      </div>
      <div className="search">
        <input className="searchinput" placeholder="Search anything" />
      </div>
      <div className="login">
        <Button variant="contained">login</Button>
      </div>
    </div>
  );
}

export default Nav;
