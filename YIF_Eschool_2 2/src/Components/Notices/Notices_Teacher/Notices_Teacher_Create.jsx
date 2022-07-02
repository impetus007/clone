import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Api from "../../../Api/axios";
import { useDataLayerValue } from "../../../DataLayer/DataLayer";
import "./notices_teacher.css";

function Notices_Teacher_Create() {
  const [errMessage, setErrMessage] = useState();
  const [succMessage, setSuccMessage] = useState();
  const [{ userDetails, loading }, dispatch] = useDataLayerValue();
  const [noticeData, setNoticeData] = useState({
    date: convertDate(new Date()),
    school_id: userDetails.schoolId,
  });

  function convertDate(inputFormat) {
    const d = new Date(inputFormat);
    const targetDate = d.toLocaleDateString().split("/");
    const returnDate = `${targetDate[1]}/${targetDate[0]}/${targetDate[2]}`;
    return returnDate;
  }

  const handleInputChange = (e) => {
    if (e.target.id === "file") {
      setNoticeData({ ...noticeData, [e.target.id]: e.target.files[0] });
    } else {
      setNoticeData({ ...noticeData, [e.target.id]: e.target.value });
    }
  };

  const addNotice = (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });
    const XHR = new XMLHttpRequest(),
      FD = new FormData();

    let keys = Object.keys(noticeData);
    let values = Object.values(noticeData);
    keys.forEach((key, i) => {
      FD.append(key, values[i]);
    });

    // Define what happens on successful data submission
    XHR.addEventListener("load", function (event) {
      dispatch({
        type: "SET_LOADING",
        loading: false,
      });
      setSuccMessage("Notice created successfully");
      setErrMessage();
    });

    // Define what happens in case of error
    XHR.addEventListener(" error", function (event) {
      setSuccMessage();
      setErrMessage("Something went wrong ... please try again later!");
    });

    // Set up request
    XHR.open("POST", "http://ec2.youthindiaeschool.com/api/v1/notices");

    // Set headers
    XHR.setRequestHeader(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );

    // Send the FormData object; HTTP headers are set automatically
    XHR.send(FD);
  };

  return (
    <div className="notices-teacher-create-container">
      <div className="notices-teacher-create-container-main">
        <div className="notices-teacher-create-box">
          <h4>Create Notice</h4>
          <div className="notices-teacher-create-main">
            <form
              action=""
              className="notices-teacher-create-form"
              onSubmit={(e) => {
                addNotice(e);
              }}
            >
              <div className="notice-teacher-create-inp">
                <label htmlFor="notice_for">This notice is meant for </label>
                <select
                  name="notice_for"
                  id="notice_for"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  required
                >
                  <option value="">Select</option>
                  <option value="STUDENT">Students</option>
                  <option value="PARENT">Parents</option>
                </select>
              </div>

              <div className="notice-teacher-create-inp">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  placeholder="Enter notice title"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  required
                />
              </div>
              <div className="notice-teacher-create-inp">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  cols="30"
                  rows="10"
                  placeholder="Enter Description"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  required
                ></textarea>
              </div>
              <div className="notice-teacher-create-inp">
                <input
                  name="file"
                  id="file"
                  type="file"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  accept="application/pdf"
                />
              </div>

              <div className="notice-teacher-create-submit">
                <button type="submit">Create Notice</button>
                <Link to="/notices_admin">
                  <button>Back</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notices_Teacher_Create;
