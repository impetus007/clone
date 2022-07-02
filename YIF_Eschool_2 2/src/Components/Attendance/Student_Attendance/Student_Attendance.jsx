import React, { useEffect, useState, useRef } from "react";
import Api from "../../../Api/axios";
import { useDataLayerValue } from "../../../DataLayer/DataLayer";
import "./student_attendance.css";
import { useReactToPrint } from "react-to-print";

function Student_Attendance() {
  const [showFilteredData, setShowFilteredData] = useState(false);
  const [{ userDetails }] = useDataLayerValue();
  const [dates, setDates] = useState({
    start_date: null,
    end_date: null,
  });
  const [attendanceData, setAttendanceData] = useState();
  const componentRef = useRef();

  useEffect(() => {
    getPersonalAttendance(false);
  }, []);

  const getPersonalAttendance = (filterData) => {
    if (filterData) {
      // console.log(Date.parse(dates.start_date));

      const filterDates = {
        start_date: +Date.parse(dates.start_date),
        end_date: +Date.parse(dates.end_date),
      };

      Api.get(
        `/attendance?start_date=${filterDates.start_date}&end_date=${filterDates.end_date}`
      )
        .then((res) => {
          // console.log(res);
          setAttendanceData(res.data);
        })
        .catch((err) => {
          // console.log(err.response) \
        });
    } else {
      Api.get("/attendance")
        .then((res) => {
          // console.log(res);
          setAttendanceData(res.data);
        })
        .catch((err) => {
          // console.log(err.response)
        });
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="student-attnd-container">
      <div className="student-attnd-container-main">
        <div className="top">
          <label htmlFor="stud_attnd">Starting Date</label>
          <input
            type="date"
            id="stud_attnd_st_date"
            name="stud_attnd_st_date"
            onChange={(e) => {
              setDates({ ...dates, start_date: e.target.value });
            }}
          />
          <label htmlFor="stud_attnd">Ending Date </label>
          <input
            type="date"
            id="stud_attnd_end_date"
            name="stud_attnd_end_date"
            onChange={(e) => {
              setDates({ ...dates, end_date: e.target.value });
            }}
          />
          <button
            onClick={() => {
              if (dates.start_date && dates.end_date) {
                setShowFilteredData(true);
                getPersonalAttendance(true);
              }
            }}
          >
            Apply Filter
          </button>
          <button onClick={handlePrint}>Print Attendance Record</button>
          {showFilteredData && (
            <button
              onClick={() => {
                setShowFilteredData(false);
                getPersonalAttendance(false);
              }}
            >
              Clear Filter
            </button>
          )}
        </div>

        <div className="bottom">
          <table ref={componentRef}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Id</th>
                {showFilteredData && dates.start_date && dates.end_date && (
                  <>
                    <th>Starting Date</th>
                    <th>Ending Date Date</th>
                  </>
                )}
                <th>Total Attendance</th>
                <th>Total Working Days</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userDetails?.name}</td>
                <td>{userDetails?.conventionalId}</td>
                {showFilteredData && dates.start_date && dates.end_date && (
                  <>
                    <td>{dates.start_date}</td>
                    <td>{dates.end_date} </td>
                  </>
                )}
                <td>{attendanceData?.attendance_count}</td>
                <td>{attendanceData?.total_class_count}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Student_Attendance;
