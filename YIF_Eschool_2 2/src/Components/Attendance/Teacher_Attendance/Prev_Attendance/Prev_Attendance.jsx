import React, { useState, useEffect, useRef } from "react";
import "./prev_attendance.css";
import { Link } from "react-router-dom";
import { studentAttendanceDummyData } from "../../studentAttendanceDummyData.js";
import { useDataLayerValue } from "../../../../DataLayer/DataLayer";
import Api from "../../../../Api/axios";
import { useReactToPrint } from "react-to-print";

function Prev_Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [allSection, setAllSection] = useState([]);
  const [errMessage, setErrMessage] = useState();

  const [{ userDetails, class_teacher_class_details }, dispatch] =
    useDataLayerValue();

  const [selectedClass, setSelectedClass] = useState(
    class_teacher_class_details?.class_name
  );
  const [selectedSection, setSelectedSection] = useState(
    class_teacher_class_details?.class_section
  );
  const componentRef = useRef();

  useEffect(() => {
    getAttendanceList();
  }, []);

  const getAttendanceList = async () => {
    let studentsFetched = false;
    let allStudents = [];
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
              allStudents.push(item._id);
              studentsFetched = true;
            }
          }
        });
      })
      .catch((err) => {
        studentsFetched = false;
      });

    if (studentsFetched) {
      await Api.post("/attendance/student-report", { ids: allStudents })
        .then((res) => {
          // console.log(res.data);
          setAttendanceData(res.data.allstudents);
        })
        .catch((err) => {
          setErrMessage(err.response.data.message);
        });
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="TPrev-Attendance-Container">
      <div className="TPrev-Attendance-Container-main">
        <div className="tprev-attend-top">
          <Link to="/attendance">
            <button>Back to Home Page</button>
          </Link>
          <button onClick={handlePrint}>Print Attendance Record</button>
        </div>

        <div className="tprev-attend-bottom" ref={componentRef}>
          <p>
            Class - {selectedClass} , Section - {selectedSection} , Attendance ,
            Report
          </p>
          <div className="tprev-info">
            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Conventional Id</th>
                  <th>Number of Attended Days</th>
                  <th>Total Working Days</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData?.map((e, i) => (
                  <tr key={i}>
                    <td>{e?.name}</td>
                    <td>{e?.conventional_id}</td>
                    <td>{e?.attendance_count}</td>
                    <td>{e?.total_class_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prev_Attendance;
