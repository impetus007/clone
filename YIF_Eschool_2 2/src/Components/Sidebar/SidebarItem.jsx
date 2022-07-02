import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { IoIosArrowDown } from "react-icons/io";

function SidebarItem({ item, sidebarCollapse, openSidebar, userDetails }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
  }, [sidebarCollapse]);

  const handleOpenOption = () => {
    setOpen(!open);
    openSidebar();
  };

  if (item.options) {
    return (
      <div
        className={open ? "sidebar-item open" : "sidebar-item"}
        onClick={() => sidebarCollapse && handleOpenOption()}
      >
        <div
          className="sidebar-title"
          onClick={() => !sidebarCollapse && handleOpenOption()}
        >
          <span>
            <div>{item?.icon}</div>
            {!sidebarCollapse && item.name}
          </span>
          {!sidebarCollapse && (
            <div
              className={`sidebar-option-toggle-icon ${
                open && "sidebar-option-toggle-icon-open"
              }`}
            >
              <IoIosArrowDown />
            </div>
          )}
        </div>
        <div className="sidebar-content">
          {item.options.map(
            (child, index) =>
              child?.opFor.includes(userDetails?.userType) && (
                <SidebarItem
                  key={index}
                  item={child}
                  sidebarCollapse={sidebarCollapse}
                  openSidebar={openSidebar}
                  userDetails={userDetails}
                />
              )
          )}
        </div>
      </div>
    );
  } else {
    return (
      <Link to={item.route} className="sidebar-item plain">
        <div className="sidebar-title">
          <span>
            <div>{item?.icon}</div>
            {!sidebarCollapse && item.name}
          </span>
        </div>
      </Link>
    );
  }
}

export default SidebarItem;
