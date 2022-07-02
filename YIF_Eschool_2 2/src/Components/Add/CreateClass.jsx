import React, { useState, useEffect } from "react";
import Api from "../../Api/axios";
import { useDataLayerValue } from "../../DataLayer/DataLayer";
import styles from "./createClass.module.css";
import Error from "../ErrorSuccess/Error";
import Success from "../ErrorSuccess/Success";

const CreateClass = () => {
  const [newUserData, setNewUserData] = useState({});
  const { btn, btn_add, input, container, create_class_inp_field } = styles;
  const [{ userDetails }, dispatch] = useDataLayerValue();
  const [newClassData, setNewClassData] = useState({
    school_name: userDetails?.schoolName,
    school_id: userDetails?.schoolId,
  });
  const [teacherIds, setTeacherIds] = useState([]);
  const [studentIds, setStudentIds] = useState([]);
  const [succMessage, setSuccMessage] = useState();
  const [errMessage, setErrMessage] = useState();
  const [allTeachers, setAllTeachers] = useState([]);
  const [allStudents, setAllStudents] = useState([]);

  const handleInputChange = (e) => {
    setNewClassData({ ...newClassData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    getAllTeachersAndStudentsList();
  }, []);

  const getAllTeachersAndStudentsList = async () => {
    let allTeachersTemp = [];
    let allStudentsTemp = [];

    await Api.get(`/user/by-school?id=${userDetails.schoolId}&type=TEACHER`)
      .then((res) => {
        res.data.forEach((t) => {
          allTeachersTemp.push(t._id);
        });
      })
      .catch((err) => {
        setSuccMessage();
        setErrMessage("Something went wrong ... Please try again later!");
      });
    await Api.get(`/user/by-school?id=${userDetails.schoolId}&type=STUDENT`)
      .then((res) => {
        res.data.forEach((s) => {
          allStudentsTemp.push(s._id);
        });
      })
      .catch((err) => {
        setSuccMessage();
        setErrMessage("Something went wrong ... Please try again later!");
      });

    setAllTeachers(allTeachersTemp);
    setAllStudents(allStudentsTemp);
  };

  // Function for adding teacher ids
  const resetTeacherFields = (tCnt) => {
    let teacherTemp = [];
    if (tCnt > 0) {
      let moreCnt = tCnt - teacherIds.length;
      for (let i = 0; i < moreCnt; i++) {
        teacherTemp.push(undefined);
      }
    } else {
      teacherTemp = [];
    }

    setTeacherIds(teacherTemp);
  };

  const addTeacherFunc = (e, i) => {
    const { id, value } = e.target;
    let teacherTemp = teacherIds;
    teacherTemp[i] = value;
    setTeacherIds(teacherTemp);
  };

  // Function for adding student ids
  const resetStudentFields = (tCnt) => {
    let studentTemp = [];
    if (tCnt > 0) {
      let moreCnt = tCnt - studentIds.length;
      for (let i = 0; i < moreCnt; i++) {
        studentTemp.push(undefined);
      }
    } else {
      studentTemp = [];
    }

    setStudentIds(studentTemp);
  };

  const addStudentFunc = (e, i) => {
    const { id, value } = e.target;
    let studentTemp = studentIds;
    studentTemp[i] = value;
    setStudentIds(studentTemp);
  };

  const createClassFunc = async (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });

    if (teacherIds.length && studentIds.length) {
      const dataToPush = {
        class_teacher_id: newClassData.class_teacher_id,
        teachers: teacherIds,
        students: studentIds,
        class_name: newClassData.class_name,
        class_section: newClassData.class_section,
        school_name: newClassData.school_name,
        school_id: newClassData.school_id,
      };

      let allValidTeachers = dataToPush.teachers.every((t) =>
        allTeachers.includes(t)
      );

      let validClassTeacher = allTeachers.includes(dataToPush.class_teacher_id);

      let allValidStudents = dataToPush.students.every((s) =>
        allStudents.includes(s)
      );

      // dataToPush.teachers.push(dataToPush.class_teacher_id);
      if (allValidTeachers && validClassTeacher && allValidStudents) {
        await Api.post("/live-class/create-class", dataToPush)
          .then((res) => {
            console.log(res);
            if (res.data.status === "400") {
              setSuccMessage();
              setErrMessage(res.data.message);
            } else {
              setSuccMessage("Class added successfully");
              setErrMessage();
            }
          })
          .catch((err) => {
            setErrMessage(err.response.data.message);
            setSuccMessage();
          });
      } else {
        if (!allValidTeachers || !validClassTeacher) {
          setSuccMessage();
          setErrMessage("Invalid Teacher(s)");
        } else {
          setSuccMessage();
          setErrMessage("Invalid Student(s)");
        }
      }
    } else {
      setSuccMessage();
      if (!teacherIds.length) {
        setErrMessage("Atleast 1 teacher must be added");
      } else if (!studentIds.length) {
        setErrMessage("Atleast 1 student must be added");
      }
    }
    dispatch({
      type: "SET_LOADING",
      loading: false,
    });
  };

  return (
    <div className={container}>
      <h2>Create Class</h2>
      <form
        onSubmit={(e) => {
          createClassFunc(e);
        }}
      >
        <div className={`${create_class_inp_field}`}>
          <label htmlFor="class_name">Enter Class</label>
          <input
            id="class_name"
            type="number"
            name="class_name"
            placeholder="eg: 3"
            onChange={(e) => {
              handleInputChange(e);
            }}
            required
          />
        </div>
        <div className={`${create_class_inp_field}`}>
          <label htmlFor="class_section">Enter Class Section</label>
          <input
            id="class_section"
            type="text"
            name="class_section"
            placeholder="eg: A"
            onChange={(e) => {
              handleInputChange(e);
            }}
            required
          />
        </div>
        <div className={`${create_class_inp_field}`}>
          <label htmlFor="class_teacher_id">Enter Class Teacher Id</label>
          <input
            id="class_teacher_id"
            type="text"
            name="class_teacher_id"
            placeholder="eg: 2XXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXaa"
            onChange={(e) => {
              handleInputChange(e);
            }}
            required
          />
        </div>
        <div className={`${create_class_inp_field}`}>
          <label htmlFor="class_teacher_id">Enter no. of teachers</label>
          <input
            id="teacher_cnt"
            type="number"
            name="teacher_cnt"
            placeholder="eg: 3"
            onChange={(e) => {
              resetTeacherFields(e.target.value);
            }}
            required
          />
        </div>
        {teacherIds.map((item, i) => (
          <div className={`${create_class_inp_field}`} key={i}>
            <label htmlFor="class_teacher_id">Teacher {i + 1} ID </label>
            <input
              id={`teacher-${i + 1}-id`}
              type="text"
              name={`teacher-${i + 1}-id`}
              placeholder="eg: 2XXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXaa"
              onChange={(e) => {
                addTeacherFunc(e, i);
              }}
              required
            />
          </div>
        ))}
        <div className={`${create_class_inp_field}`}>
          <label htmlFor="class_student_id">Enter no. of students</label>
          <input
            id="student_cnt"
            type="number"
            name="student_cnt"
            placeholder="eg: 3"
            onChange={(e) => {
              resetStudentFields(e.target.value);
            }}
            required
          />
        </div>
        {studentIds.map((item, i) => (
          <div className={`${create_class_inp_field}`} key={i}>
            <label htmlFor="student">Student {i + 1} ID </label>
            <input
              id={`student-${i + 1}-id`}
              type="text"
              name={`student-${i + 1}-id`}
              placeholder="eg: 2XXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXaa"
              onChange={(e) => {
                addStudentFunc(e, i);
              }}
              required
            />
          </div>
        ))}

        {succMessage ? (
          <Success message={succMessage} />
        ) : errMessage ? (
          <Error message={errMessage} />
        ) : (
          ""
        )}
        <button type="submit" className={`${btn} ${btn_add}`}>
          Create Class
        </button>
      </form>
    </div>
  );
};

export default CreateClass;
