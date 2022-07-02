import React from "react";
import "./Adminfeecollection.css";
import { NavLink } from "react-router-dom";
const AdminfeeCollection = () => {
  return (
    <div>
      <NavLink to="/fees-collection/Complete-Details">
        <button
          className="fee-admin-button"
          style={{ border: "2px solid black" }}
        >
          Complete Details
        </button>
      </NavLink>
      <NavLink to="/fees-collection/Details">
        <button
          className="fee-admin-button"
          style={{ border: "2px solid black" }}
        >
          Add Details
        </button>
      </NavLink>
    </div>
  );
};

export default AdminfeeCollection;
