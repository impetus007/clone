import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Api from "../../../Api/axios";
import { useDataLayerValue } from "../../../DataLayer/DataLayer";
import "./admin_attendance.css";
import { useReactToPrint } from "react-to-print";

function Admin_Attendance() {
  const [attendanceType, setAttendanceType] = useState("Staff");
  const [showTable, setShowTable] = useState(false);
  const [selectedSection, setSelectedSection] = useState();
  const [selectedClass, setSelectedClass] = useState();
  const [attendanceData, setAttendanceData] = useState([]);
  const [attendanceDataFiltered, setAttendanceDataFiltered] = useState([]);
  const [{ userDetails }] = useDataLayerValue();
  const [errMessage, setErrMessage] = useState();
  const [classListTemp, setClassListTemp] = useState({});
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [fetchAllStudents, setFetchAllStudents] = useState(false);
  const componentRef = useRef();

  useEffect(() => {
    getClasses();
  }, []);

  const getClasses = async () => {
    let classTemp = {};
    await Api.get("/live-class").then((res) => {
      res.data.forEach((class_) => {
        // console.log(class_);
        if (!(class_.class_name in classTemp)) {
          classTemp[class_.class_name] = {
            sections: [class_.class_section],
          };
        } else {
          let prevClassTemp = classTemp[class_.class_name].sections;
          prevClassTemp.push(class_.class_section);
          classTemp[class_.class_name].sections = prevClassTemp;
        }
      });
    });
    setClassListTemp(classTemp);
    const classesTemp = Object.keys(classTemp);
    setClasses(classesTemp);
    // console.log(classesTemp);
  };

  const selectClassFunc = (e) => {
    const { value } = e.target;
    setSelectedClass(value);
    if (value !== "All") {
      if (value === "") {
        setSections([]);
      } else {
        setSections(classListTemp[value].sections);
      }
    }
  };

  const getAttendanceList = async (e) => {
    e.preventDefault();
    if (selectedClass === "All") {
      setFetchAllStudents(true);
    } else {
      setFetchAllStudents(false);
    }
    let studentsFetched = false;
    let allStudents = [];
    setShowTable(true);
    await Api.get(`/user/by-school?id=${userDetails.schoolId}&type=STUDENT`)
      .then((res) => {
        res.data.forEach((item) => {
          if (item.classes) {
            let classDetails = item.classes[item.classes.length - 1].split(" ");
            let className = classDetails[0];
            let classSection = classDetails[1];
            if (selectedClass === "All") {
              allStudents.push(item._id);
              studentsFetched = true;
            } else {
              if (
                className === selectedClass &&
                classSection === selectedSection
              ) {
                // console.log(item);
                allStudents.push(item._id);
                studentsFetched = true;
              }
            }
          }
        });
      })
      .catch((err) => {
        // console.log(err);
        studentsFetched = false;
      });
    if (studentsFetched) {
      await Api.post("/attendance/student-report", { ids: allStudents })
        .then((res) => {
          let attendanceDataTemp = res.data.allstudents;
          console.log(attendanceDataTemp);
          attendanceDataTemp.forEach((item) => {
            item.class_name = item.class_name_section.split(" ")[0];
            item.class_section = item.class_name_section.split(" ")[1];
          });
          setAttendanceData(attendanceDataTemp);
          setFilteredAttendanceDetails();
        })
        .catch((err) => {
          setErrMessage(err);
        });
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const changeFilterData = (e) => {
    const { id, value } = e.target;
    setFilterData({ ...filterData, [id]: value });
  };

  useEffect(() => {
    setFilteredAttendanceDetails();
  }, [filterData, attendanceData]);

  const setFilteredAttendanceDetails = () => {
    const keys = Object.keys(filterData);
    let allEmpty = Object.values(filterData).every(
      (x) => x === null || x === "" || x === undefined
    );
    if (allEmpty || filterData === {}) {
      setAttendanceDataFiltered(attendanceData);
    } else {
      let tempAttendanceFilteredData = attendanceData.filter((attd) => {
        return keys.every((key) =>
          attd[key]
            ?.toLocaleLowerCase()
            .includes(filterData[key]?.toLocaleLowerCase())
        );
      });
      setAttendanceDataFiltered(tempAttendanceFilteredData);
    }
  };

  return (
    <div className="ad-attnd-container">
      <div className="ad-attnd-container-main">
        <div className="ad-attnd-top">
          <button
            className={attendanceType === "Staff" && "ad-attnd-top-btn-active"}
            onClick={() => {
              setAttendanceType("Staff");
            }}
          >
            Staff
          </button>
          <button
            className={
              attendanceType === "Student" && "ad-attnd-top-btn-active"
            }
            onClick={() => {
              setAttendanceType("Student");
            }}
          >
            Student
          </button>
        </div>

        <h4>{attendanceType === "Staff" ? "Staff Attendance" : ""}</h4>

        <div
          className={`ad-attnd-middle ${
            attendanceType === "Student" && "ad-attnd-middle-invis"
          }`}
        >
          <Link to="teacher_attendance">
            <button>Update Teachers Attendance</button>
          </Link>
          <Link to="teacher_attendance/prev-attnd">
            <button>View Previous Attendance</button>
          </Link>
        </div>

        <div
          className={`ad-attnd-bottom ${
            attendanceType !== "Student" && "ad-attnd-bottom-invis"
          }`}
        >
          <form
            className="ad-st-attnd-top"
            onSubmit={(e) => {
              getAttendanceList(e);
            }}
          >
            <label htmlFor="ad-st-attnd-class">Select Class : </label>
            <select
              name="ad-st-attnd-class"
              id="ad-st-attnd-class"
              onChange={(e) => {
                selectClassFunc(e);
              }}
              required
            >
              <option value="">Select Class</option>
              <option value="All">All</option>
              {classes.map((class_) => (
                <option value={class_}>{class_}</option>
              ))}
            </select>
            {selectedClass !== "All" && (
              <>
                <label htmlFor="ad-st-attnd-dept">Select Section : </label>

                <select
                  name="ad-attnd-teach-dept"
                  id="ad-attnd-teach-dept"
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  required
                >
                  <option value="">Select Section</option>
                  {sections.map((section_) => (
                    <option value={section_}>{section_}</option>
                  ))}
                </select>
              </>
            )}

            <button type="submit">Get Attendance Record</button>
            {showTable && (
              <button type="submit" onClick={handlePrint}>
                Print Attendance Record
              </button>
            )}
          </form>
          {showTable ? (
            <div className="ad-st-attnd-bottom" ref={componentRef}>
              <p>
                Class - {selectedClass} , Section -{" "}
                {selectedClass === "All" ? "All" : selectedSection} , Attendance
                Report
              </p>
              <div className="ad-st-attnd-bottom-info">
                <table>
                  <thead>
                    <tr>
                      <th>
                        <div className="ad-st-attnd-table-filter">
                          Student Name
                          <input
                            type="text"
                            id="name"
                            placeholder="eg: Ayan"
                            onChange={(e) => changeFilterData(e)}
                          />
                        </div>
                      </th>
                      <th>
                        <div className="ad-st-attnd-table-filter">
                          Conventional Id
                          <input
                            type="text"
                            id="conventional_id"
                            placeholder="eg: STUDENT-1653XXXXXX123"
                            onChange={(e) => changeFilterData(e)}
                          />
                        </div>
                      </th>
                      {fetchAllStudents && (
                        <th>
                          <div className="ad-st-attnd-table-filter">
                            Class
                            <input
                              type="text"
                              id="class_name"
                              placeholder="eg: 5"
                              onChange={(e) => changeFilterData(e)}
                            />
                          </div>
                        </th>
                      )}
                      {fetchAllStudents && (
                        <th>
                          <div className="ad-st-attnd-table-filter">
                            Section
                            <input
                              type="text"
                              id="class_section"
                              placeholder="eg: A"
                              onChange={(e) => changeFilterData(e)}
                            />
                          </div>
                        </th>
                      )}
                      <th>
                        <div className="ad-st-attnd-table-filter">
                          Number of Attended Days
                        </div>
                      </th>
                      <th>
                        <div className="ad-st-attnd-table-filter">
                          Total Working Days
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceDataFiltered?.map((e, i) => (
                      <tr key={i}>
                        <td>{e?.name}</td>
                        <td>{e?.conventional_id}</td>
                        {fetchAllStudents && (
                          <>
                            <td>{e?.class_name_section.split(" ")[0]}</td>
                            <td>{e?.class_name_section.split(" ")[1]}</td>
                          </>
                        )}
                        <td>{e?.attendance_count}</td>
                        <td>{e?.total_class_count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      .
    </div>
  );
}

export default Admin_Attendance;
