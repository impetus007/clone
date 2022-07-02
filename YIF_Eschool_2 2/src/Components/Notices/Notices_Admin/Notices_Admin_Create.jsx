import React, { useState, useEffect } from "react";
import "./notices_admin.css";
import { Link } from "react-router-dom";
import { useDataLayerValue } from "../../../DataLayer/DataLayer";
import Error from "../../ErrorSuccess/Error";
import Success from "../../ErrorSuccess/Success";

function Notices_Admin_Create() {
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
    <div className="Notices_admin-create">
      <div className="notices-admin-create-container">
        <div className="notices-admin-create-container-main">
          <div className="notices-admin-create-box">
            <div className="notices-admin-create-main">
              <form
                onSubmit={(e) => {
                  addNotice(e);
                }}
              >
                <div className="notice-admin-create-inp">
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
                    <option value="TEACHER">Teachers</option>
                    <option value="STUDENT">Students</option>
                    <option value="PARENT">Parents</option>
                  </select>
                  <input
                    id="school_id"
                    name="school_id"
                    value={userDetails?.schoolId}
                    hidden
                  />
                </div>

                <div className="notice-admin-create-inp">
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
                <div className="notice-admin-create-inp">
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

                <div className="notice-admin-create-inp">
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
                <div className="notice-admin-create-submit">
                  {succMessage ? (
                    <Success message={succMessage} />
                  ) : errMessage ? (
                    <Error message={errMessage} />
                  ) : (
                    ""
                  )}
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
    </div>
  );
}

export default Notices_Admin_Create;
