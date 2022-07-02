import React, { useState, useEffect } from "react";
import "./teacher_attendance.css";
import { Link } from "react-router-dom";
import { markAttendanceDummyData } from "../markAttendanceDummyData.js";
import Api from "../../../Api/axios";
import { useDataLayerValue } from "../../../DataLayer/DataLayer";
import Success from "../../ErrorSuccess/Success";
import Error from "../../ErrorSuccess/Error";

function Teacher_Attendance() {
  const [showTable, setShowTable] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [markAllClick, setMarkAllClick] = useState(false);
  const [{ userDetails, class_teacher_class_details }, dispatch] =
    useDataLayerValue();

  const [selectedClass, setSelectedClass] = useState(
    class_teacher_class_details?.class_name
  );
  const [selectedSection, setSelectedSection] = useState(
    class_teacher_class_details?.class_section
  );

  const [errMessage, setErrMessage] = useState();
  const [succMessage, setSuccMessage] = useState();

  const getAttendanceList = async () => {
    let studentsFetched = false;
    let studentList = [];
    setShowTable(true);
    await Api.get(`/user/by-school?id=${userDetails.schoolId}&type=STUDENT`)
      .then((res) => {
        res.data.forEach((item) => {
          if (item.classes) {
            let classDetails = item.classes[item.classes.length - 1].split(" ");
            let className = classDetails[0];
            let classSection = classDetails[1];
            if (
              className === selectedClass &&
              classSection === selectedSection
            ) {
              studentList.push(item);
              studentsFetched = true;
              // console.log(item);
            }
          }
        });
      })
      .catch((err) => {
        // console.log(err);
        studentsFetched = false;
      });

    if (studentsFetched) {
      setAttendanceData(studentList);
    }
  };

  const markPresent = (e) => {
    const { id, checked } = e.target;
    if (!checked) {
      setAttendees(attendees.filter((item) => item !== id));
    } else {
      setAttendees([...attendees, id]);
    }
  };

  const handleMarkAll = (e) => {
    setMarkAllClick(e.target.checked);
    attendanceData.forEach((item) => {
      setAttendees((prevState) => [...prevState, item._id]);
    });
    if (!e.target.checked) {
      setAttendees([]);
    }
  };

  const updateAttendanceSheet = async () => {
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });
    let attendeesPresent = {};
    attendees.forEach((item) => {
      Object.assign(attendeesPresent, { [item]: true });
    });

    attendanceData.forEach((item) => {
      if (!(item._id in attendeesPresent)) {
        Object.assign(attendeesPresent, { [item._id]: false });
      }
    });

    const dataToPush = {
      attendance: attendeesPresent,
      school_id: userDetails.schoolId,
      attendeeType: "STUDENT",
      class_name: selectedClass,
      class_section: selectedSection,
    };
    // console.log(dataToPush);

    await Api.post("/attendance", dataToPush)
      .then((res) => {
        // console.log(res.data);
        setSuccMessage("Attendance recorded successfully");
      })
      .catch((err) => {
        setErrMessage(err.response);
      });
    dispatch({
      type: "SET_LOADING",
      loading: false,
    });
  };

  return (
    <div className="Tattendance-container">
      <div className="Tattendance-container-main">
        <div className="Tattend-top">
          <button
            onClick={() => {
              getAttendanceList();
            }}
          >
            Generate Attendance Sheet
          </button>
          <Link to="prev-attendance">
            <button>View Previous Attendance</button>
          </Link>
          <Link to="/">
            <button>Back to home page</button>
          </Link>
        </div>
        {showTable ? (
          <>
            <div className="tprev-details">
              <p>
                Class - {selectedClass} , Section - {selectedSection} ,
                Attendance , Report
              </p>
            </div>
            <div className="Tattend-middle">
              {showTable && (
                <div>
                  <div className="mark-all-container">
                    <div className="att-response-message">
                      {succMessage ? (
                        <Success message={succMessage} />
                      ) : errMessage ? (
                        <Error message={errMessage} />
                      ) : (
                        ""
                      )}
                    </div>
                    <div>
                      <label htmlFor="ad-teacher-all">Mark all present</label>
                      <input
                        type="checkbox"
                        name="ad-teacher-all"
                        id="ad-teacher-all"
                        onChange={(e) => {
                          handleMarkAll(e);
                        }}
                      />
                    </div>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>Student Name</th>
                        <th>Student Id</th>
                        <th>Class</th>
                        <th>Section</th>
                        <th>Attendance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceData?.map((e, i) => (
                        <tr key={i}>
                          <td>{e.name}</td>
                          <td>{e.conventionalId}</td>
                          <td>{selectedClass}</td>
                          <td>{selectedSection}</td>
                          <td>
                            <input
                              type="checkbox"
                              name="tattend-present"
                              id={e._id}
                              onChange={(element) => {
                                markPresent(element);
                              }}
                              checked={
                                (markAllClick && attendees.includes(e._id)) ||
                                attendees.includes(e._id)
                              }
                            />
                            Present
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    onClick={() => {
                      updateAttendanceSheet();
                    }}
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
            <div className="Tattend-bottom"></div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Teacher_Attendance;
