import React, { useState, useEffect } from "react";
import Notice_Board from "../Notice_Board";
import "./notices_teacher.css";
import Notices_Teacher_Create from "./Notices_Teacher_Create";
import { Link } from "react-router-dom";
import { useDataLayerValue } from "../../../DataLayer/DataLayer";
import Api from "../../../Api/axios";

function Notices_Teacher() {
  const [notices, setNotices] = useState([]);
  const [{ class_teacher_class_details }] = useDataLayerValue();

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
    <div className="Notices_Teacher">
      <div className="notices-teacher-container">
        <Notice_Board notices={notices} />
        {class_teacher_class_details !== undefined && (
          <Link to="create-notice">
            <button className="notices-teacher-btn">Create Notices</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Notices_Teacher;
