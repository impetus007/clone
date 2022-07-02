import React from "react";
import "./User_profile.css";
import UserD from "./User_details";
import UserE from "./User_Edit";
import { Route, Routes, NavLink } from "react-router-dom";
const User_profile = () => {
  return (
    <div className="user-head">
      <div className="user-profile-container">
        <UserD />
        <NavLink to="/user-profile/Edit">
          <button>Edit User Profile</button>
        </NavLink>
      </div>
    </div>
  );
};

export default User_profile;
