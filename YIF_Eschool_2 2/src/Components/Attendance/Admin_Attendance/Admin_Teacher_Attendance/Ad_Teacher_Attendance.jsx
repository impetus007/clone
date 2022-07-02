import React, { useEffect, useState } from "react";
import "./ad_teacher_attendance.css";
import { Link } from "react-router-dom";
import { useDataLayerValue } from "../../../../DataLayer/DataLayer";
import Api from "../../../../Api/axios";
import Error from "../../../ErrorSuccess/Error";
import Success from "../../../ErrorSuccess/Success";

function Ad_Teacher_Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [showAttendance, setShowAttendance] = useState(false);
  const [markAllClick, setMarkAllClick] = useState(false);
  const [attendees, setAttendees] = useState([]);
  const [errMessage, setErrMessage] = useState();
  const [succMessage, setSuccMessage] = useState();
  const [{ userDetails }, dispatch] = useDataLayerValue();

  useEffect(() => {
    getAttendanceList();
  }, []);

  const getAttendanceList = () => {
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });
    Api.get(`/user/by-school?id=${userDetails?.schoolId}&type=TEACHER`)
      .then((res) => {
        setAttendanceData(res.data);
        dispatch({
          type: "SET_LOADING",
          loading: false,
        });
      })
      .catch((err) => {
        setErrMessage(err.response);
        dispatch({
          type: "SET_LOADING",
          loading: false,
        });
      });
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

  const updateAttendanceSheet = () => {
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
      attendee_type: "TEACHER",
    };

    Api.post("/attendance", dataToPush)
      .then((res) => {
        setSuccMessage("Attendance recorded successfully");
        dispatch({
          type: "SET_LOADING",
          loading: false,
        });
      })
      .catch((err) => {
        setErrMessage(err.response);
        dispatch({
          type: "SET_LOADING",
          loading: false,
        });
      });
  };

  return (
    <div className="ad-attnd-teacher-container">
      <div className="ad-attnd-teacher-container-main">
        <div className="top">
          <p>Today's Date - {new Date().toLocaleDateString()}</p>

          <div>
            <button onClick={() => setShowAttendance(true)}>
              Mark Attendance
            </button>
            <Link to="/attendance">
              <button>Back to Home Page</button>
            </Link>
          </div>
        </div>
        <div className="middle"></div>

        <div className="bottom">
          {showAttendance && (
            <div className="ad-attnd-teacher-attnd-sheet-container">
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
                    <th>Teacher Name</th>
                    <th>Teacher Id</th>
                    <th>Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map((e, i) => (
                    <tr key={i}>
                      <td>{e.name}</td>
                      <td>{e.conventionalId}</td>
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
              <div className="ad-teacher-update-btn">
                <button onClick={() => updateAttendanceSheet()}>Submit</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Ad_Teacher_Attendance;
