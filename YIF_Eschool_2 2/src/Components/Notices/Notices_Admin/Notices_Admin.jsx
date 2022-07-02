import React, { useState, useEffect } from "react";
import Notice_Board from "../Notice_Board";
import "./notices_admin.css";
import Notices_Admin_Create from "./Notices_Admin_Create";
import { Link } from "react-router-dom";
import Api from "../../../Api/axios";

function Notices_Admin() {
  const [notices, setNotices] = useState([]);

  const fetchNotices = async () => {
    await Api.get("/notices")
      .then((res) => setNotices(res.data))
      .catch((err) => {
        // console.log(err.response.data.message)
      });
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div className="Notices_Admin">
      <div className="notices-admin-container">
        <Notice_Board />
        <Link to="create-notice">
          <button className="notices-admin-btn">Create Notices</button>
        </Link>
      </div>
    </div>
  );
}

export default Notices_Admin;
