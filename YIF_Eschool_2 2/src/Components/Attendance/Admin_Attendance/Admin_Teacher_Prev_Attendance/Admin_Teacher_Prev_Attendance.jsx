import React, { useState, useEffect, useRef } from "react";
import "./admin_teacher_prev_attnd.css";
import { Link } from "react-router-dom";
import Api from "../../../../Api/axios";
import { useDataLayerValue } from "../../../../DataLayer/DataLayer";
import Error from "../../../ErrorSuccess/Error";
import { useReactToPrint } from "react-to-print";

function Admin_Teacher_Prev_Attendance() {
  const [attendanceData, setAttendanceData] = useState();
  const [showTable, setShowTable] = useState(false);
  const [userListReceived, setUserListReceived] = useState(false);
  const [userList, setuserList] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [{ userDetails }, dispatch] = useDataLayerValue();
  const [errMessage, setErrMessage] = useState();
  const componentRef = useRef();

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = () => {
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });
    Api.get(`/user/by-school?id=${userDetails.schoolId}&type=TEACHER`)
      .then((res) => {
        let tempUserList = [];
        res.data.forEach((item) => {
          tempUserList.push({
            name: item.name,
            _id: item._id,
            conventionalId: item.conventionalId,
            attendance: "Absent",
          });
        });
        setuserList(tempUserList);
        setUserListReceived(true);
        dispatch({
          type: "SET_LOADING",
          loading: false,
        });
      })
      .catch((err) => {
        setErrMessage(err.response.message);
        dispatch({
          type: "SET_LOADING",
          loading: false,
        });
      });
  };

  function convertDate(inputFormat) {
    const d = new Date(inputFormat);
    const targetDate = d.toLocaleDateString().split("/");
    const returnDate = `${targetDate[1]}/${targetDate[0]}/${targetDate[2]}`;
    return returnDate;
  }

  const getAttendanceList = (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });
    setShowTable(true);
    const options = {
      attendance_data: {
        attendee_type: "TEACHER",
        date: convertDate(selectedDate),
        school_id: userDetails?.schoolId,
      },
    };
    // console.log(options);
    Api.post(`/attendance/attendance-of-users`, options)
      .then((res) => {
        if (
          res.data.attendance_list.length > 0 &&
          res.data.attendance_list[0].attendees_present.length > 0
        ) {
          getAttendanceStatus(
            res.data.attendance_list[res.data.attendance_list.length - 1]
              .attendees_present
          );
        }
        dispatch({
          type: "SET_LOADING",
          loading: false,
        });
      })
      .catch((err) => {
        setErrMessage(err.response?.data?.message);
        dispatch({
          type: "SET_LOADING",
          loading: false,
        });
      });
  };

  const getAttendanceStatus = (presentAttendeeList) => {
    let userAttendance = [];
    let userListTemp = userList;
    presentAttendeeList.forEach((_id) => {
      const user_ = userListTemp.filter((u) => u._id === _id);
      if (user_.length > 0) {
        userAttendance.push({
          name: user_[0].name,
          conventionalId: user_[0].conventionalId,
          attendance: "Present",
        });
        userListTemp = userListTemp.filter((u) => u._id !== _id);
      }
    });
    userListTemp.forEach((absentUser) => {
      userAttendance.push(absentUser);
    });

    setuserList(userAttendance);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="admin-teacher-prev-attnd-container">
      <div className="admin-teacher-prev-attnd-container-main">
        <form action="" onSubmit={(e) => getAttendanceList(e)}>
          <div className="top">
            <div>
              <label htmlFor="ad-t-prev-att">Select Date </label>
              <input
                type="date"
                id="ad-t-prev-att-date"
                name="ad-t-prev-att"
                value={selectedDate}
                max={Date.now()}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className="middle">
            <button type="submit">Generate Attendance Sheet</button>
            {showTable && (
              <button type="button" onClick={handlePrint}>
                Print Attendance Sheet
              </button>
            )}{" "}
            <Link to="../attendance">
              <button type="button">Home Page</button>
            </Link>
          </div>
        </form>
        {showTable ? (
          <div className="bottom" ref={componentRef}>
            <p style={{ marginBottom: "10px" }}>
              Date : {new Date(selectedDate).toDateString()}
            </p>
            {errMessage && <Error message={errMessage} />}
            <table>
              <thead>
                <tr>
                  <th>Teacher Name</th>
                  <th>Teacher Id</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((e, i) => (
                  <tr key={i}>
                    <td>{e?.name}</td>
                    <td>{e?.conventionalId}</td>
                    <td>{e?.attendance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Admin_Teacher_Prev_Attendance;
