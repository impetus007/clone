import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { useDataLayerValue } from "../../DataLayer/DataLayer";
import { setToken } from "../../Api/axios";

function Header({logout}) {
  const [{ loggedIn }, dispatch] = useDataLayerValue();

  return (
    <div className="Header">
      <div className="navbar">
        <div className="navbar-left">
          <Link to="/">
            <div className="logo">
              <img src="./Images/logo.png" alt="" />
            </div>
            <h3>YIE-SCHOOL</h3>
          </Link>
        </div>

        <div className="navbar-right">
          {loggedIn && (
            <button
              className="nav-login-btn"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
