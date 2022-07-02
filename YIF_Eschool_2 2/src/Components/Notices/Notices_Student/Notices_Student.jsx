import React, { useState, useEffect } from "react";
import "./notices_student.css";
import Notice_Board from "../Notice_Board";
import { useDataLayerValue } from "../../../DataLayer/DataLayer";
import Api from "../../../Api/axios";

function Notices_Student() {
  const [selectedClass, setSelectedClass] = useState();
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
    <div className="Notices_Student">
      <div className="notices-student-container">
        <Notice_Board notices={notices} />
        <button className="notices-student-btn">Update Notices</button>
      </div>
    </div>
  );
}

export default Notices_Student;
