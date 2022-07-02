import React, { useState, useEffect } from "react";
import "./sidebar.css";
import { Routes, Link } from "react-router-dom";
import { useDataLayerValue } from "../../DataLayer/DataLayer";
import SidebarItem from "./SidebarItem";
import { IoMdExit } from "react-icons/io";

function Sidebar() {
  const [{ sidebarOptions, userDetails, initialState, loggedIn }, dispatch] =
    useDataLayerValue();
  const [optionSelected, setOptionSelected] = useState(-1);
  const [newSidebarOptions, setNewSidebarOptions] = useState([]);
  const [sidebarCollapse, setSidebarCollapse] = useState(false);

  const openSidebar = () => {
    setSidebarCollapse(false);
  };

  return (
    <>
      {loggedIn && (
        <div className={`sidebar ${sidebarCollapse && "sidebar-collapse"}`}>
          <div className="sidebar-options">
            {sidebarOptions?.map(
              (option, i) =>
                option?.opFor.includes(userDetails?.userType) && (
                  <SidebarItem
                    key={i}
                    item={option}
                    sidebarCollapse={sidebarCollapse}
                    openSidebar={openSidebar}
                    userDetails={userDetails}
                  />
                )
            )}
          </div>
          <div className="sidebar-collapser">
            <IoMdExit
              size={22}
              style={{ minWidth: "22px" }}
              className={`sidebar-collapser-icon ${
                sidebarCollapse && "sidebar-collapser-icon-toggle"
              }`}
              onClick={() => setSidebarCollapse(!sidebarCollapse)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
