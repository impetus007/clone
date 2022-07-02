import React, { useState, useEffect } from "react";
import Api from "../../../Api/axios";
import { useDataLayerValue } from "../../../DataLayer/DataLayer";
import styles from "./inhouse_class.module.css";
import Error from "../../ErrorSuccess/Error";
import Success from "../../ErrorSuccess/Success";
const Create_Inhouse_Subject = () => {
  const [{ userDetails }, dispatch] = useDataLayerValue();
  const { btn, btn_add, input, container, create_class_inp_field } = styles;
  const [succMessage, setSuccMessage] = useState();
  const [errMessage, setErrMessage] = useState();
  const [subjectDetails, setSubjectDetails] = useState({});
  const [classes, setClasses] = useState();
  useEffect(() => {
    getClasses();
  }, []);

  const getClasses = async () => {
    setSuccMessage();
    setErrMessage();
    await Api.get("/live-class/get-inhouse-classes-central")
      .then((res) => {
        let classesTemp = res.data.sort((a, b) =>
          a.class_name > b.class_name ? 1 : -1
        );
        setClasses(classesTemp);
        setErrMessage();
        setSuccMessage();
      })
      .catch((err) =>
        setErrMessage("Something went wrong! please try again later")
      );
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSubjectDetails({ ...subjectDetails, [id]: value });
  };

  const createSubjectFunc = async (e) => {
    e.preventDefault();
    setSuccMessage();
    setErrMessage();
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });
    await Api.post("/live-class/add-inhouse-subject", subjectDetails)
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
            onChange={(e) => handleInputChange(e)}
            required
          >
            <option value="">Select Class</option>
            {classes?.map((cl, i) => (
              <option value={cl._id}>{cl.class_name}</option>
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

export default Create_Inhouse_Subject;
