import React, { useState, useEffect } from "react";
import Api from "../../../Api/axios";
import { useDataLayerValue } from "../../../DataLayer/DataLayer";
import styles from "./inhouse_class.module.css";
import Error from "../../ErrorSuccess/Error";
import Success from "../../ErrorSuccess/Success";

const Create_Inhouse_Class = () => {
  const [newUserData, setNewUserData] = useState({});
  const { btn, btn_add, input, container, create_class_inp_field } = styles;
  const [{ userDetails }, dispatch] = useDataLayerValue();
  const [newClassData, setNewClassData] = useState({});
  const [schoolIds, setSchoolIds] = useState([]);
  const [studentIds, setStudentIds] = useState([]);
  const [succMessage, setSuccMessage] = useState();
  const [errMessage, setErrMessage] = useState();

  const handleInputChange = (e) => {
    setNewClassData({ ...newClassData, [e.target.id]: e.target.value });
  };

  // Function for adding teacher ids
  const resetSchoolFields = (scnt) => {
    let schoolTemp = [];
    if (scnt > 0) {
      let moreCnt = scnt - schoolIds.length;
      for (let i = 0; i < moreCnt; i++) {
        schoolTemp.push(undefined);
      }
    } else {
      schoolTemp = [];
    }

    setSchoolIds(schoolTemp);
  };

  const addSchoolFunc = (e, i) => {
    const { id, value } = e.target;
    let schoolIdsTemp = schoolIds;
    schoolIdsTemp[i] = value;
    setSchoolIds(schoolIdsTemp);
  };

  const createClassFunc = async (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });

    if (schoolIds.length) {
      const dataToPush = {
        school_ids: schoolIds,
        class_name: newClassData.class_name,
        school_board: newClassData.school_board,
      };

      await Api.post("/live-class/create-inhouse-class", dataToPush)
        .then((res) => {
          setSuccMessage("Class added successfully");
          setErrMessage();
        })
        .catch((err) => {
          setErrMessage(err.response.data.message);
          setSuccMessage();
        });
    } else {
      setSuccMessage();
      setErrMessage("Atleast 1 school must be added");
    }
    dispatch({
      type: "SET_LOADING",
      loading: false,
    });
  };

  return (
    <div className={container}>
      <h2>Create In-house Class</h2>
      <form
        onSubmit={(e) => {
          createClassFunc(e);
        }}
      >
        <div className={`${create_class_inp_field}`}>
          <label htmlFor="class_name">Board</label>
          <input
            id="school_board"
            type="text"
            name="school_board"
            placeholder="eg: CBSE"
            onChange={(e) => {
              handleInputChange(e);
            }}
            required
          />
        </div>
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
          <label htmlFor="class_teacher_id">Enter no. of schools</label>
          <input
            id="schoolcnt_cnt"
            type="number"
            name="schoolcnt_cnt"
            placeholder="eg: 3"
            min={1}
            onChange={(e) => {
              resetSchoolFields(e.target.value);
            }}
            required
          />
        </div>
        {schoolIds.map((item, i) => (
          <div className={`${create_class_inp_field}`} key={i}>
            <label htmlFor="class_teacher_id">School {i + 1} ID </label>
            <input
              id={`school-${i + 1}-id`}
              type="text"
              name={`school-${i + 1}-id`}
              placeholder="eg: 2XXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXaa"
              onChange={(e) => {
                addSchoolFunc(e, i);
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

export default Create_Inhouse_Class;
