import React, { useState, useEffect } from "react";
import Api from "../../Api/axios";
import { useDataLayerValue } from "../../DataLayer/DataLayer";
import styles from "./createClass.module.css";
import Error from "../ErrorSuccess/Error";
import Success from "../ErrorSuccess/Success";
const CreateSubject = () => {
  const [{ userDetails }, dispatch] = useDataLayerValue();
  const [newUserData, setNewUserData] = useState({});
  const { btn, btn_add, input, container, create_class_inp_field } = styles;
  const [teachers, setTeachers] = useState([]);
  const [classTeachers, setClassTeachers] = useState([]);
  const [succMessage, setSuccMessage] = useState();
  const [errMessage, setErrMessage] = useState();
  const [subjectDetails, setSubjectDetails] = useState({
    teacher_id: userDetails?._id,
  });
  const [classes, setClasses] = useState();
  useEffect(() => {
    getClasses();
  }, []);

  const getClasses = async () => {
    await Api.get("/live-class")
      .then((res) => {
        setClasses(res.data);
        console.log(res.data);
        setErrMessage();
        setSuccMessage();
      })
      .catch((err) =>
        setErrMessage("Something went wrong! please try again later")
      );

    await Api.get("/user/by-school", {
      params: { id: userDetails?.schoolId, type: "TEACHER" },
    })
      .then((res) => setTeachers(res.data))
      .catch((err) => setErrMessage(err?.response?.data?.message));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSubjectDetails({ ...subjectDetails, [id]: value });
  };

  const selectClassFunc = (e) => {
    handleInputChange(e);
    const classId = e.target.value;
    let classTeachersTemp = [];
    const targetClass = classes.filter((cl) => cl._id === classId)[0];
    const targetClassTeachers = targetClass?.teachers;
    targetClassTeachers?.forEach((tcs) => {
      classTeachersTemp.push(teachers.filter((t) => tcs === t._id)[0]);
    });
    setClassTeachers(classTeachersTemp);
  };

  const createSubjectFunc = async (e) => {
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });
    e.preventDefault();
    console.log(subjectDetails);
    await Api.post("/live-class/add-subject", subjectDetails)
      .then((res) => {
        setSuccMessage("New Subject added successfully");
        setErrMessage();
      })
      .catch((err) => {
        setSuccMessage();
        setErrMessage(err?.response?.data?.message);
      });
    dispatch({
      type: "SET_LOADING",
      loading: false,
    });
  };

  return (
    <div className={container}>
      <h2>Create Subject</h2>
      <form
        onSubmit={(e) => {
          createSubjectFunc(e);
        }}
      >
        <div className={`${create_class_inp_field}`}>
          <label htmlFor="classroom_id">Select Class</label>
          <select
            name="class"
            id="classroom_id"
            onChange={(e) => selectClassFunc(e)}
            required
          >
            <option value="">Select Class</option>
            {classes?.map((cl, i) => (
              <option value={cl._id}>{cl.class_name_section}</option>
            ))}
          </select>
        </div>
        <div className={`${create_class_inp_field}`}>
          <label htmlFor="teacher_id">Select Teacher</label>
          <select
            name="teacher"
            id="teacher_id"
            onChange={(e) => handleInputChange(e)}
            required
          >
            <option value="">Select Class</option>
            {classTeachers?.map((t, i) => (
              <option value={t?._id}>{t?.name}</option>
            ))}
          </select>
        </div>
        <div className={`${create_class_inp_field}`}>
          <label htmlFor="name">Enter Subject Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="eg: English"
            onChange={(e) => {
              handleInputChange(e);
            }}
            required
          />
        </div>

        {succMessage ? (
          <Success message={succMessage} />
        ) : errMessage ? (
          <Error message={errMessage} />
        ) : (
          ""
        )}
        <button type="submit" className={`${btn} ${btn_add}`}>
          Create Subject
        </button>
      </form>
    </div>
  );
};

export default CreateSubject;
