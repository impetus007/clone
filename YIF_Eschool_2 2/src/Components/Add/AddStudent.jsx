import React, { useState } from "react";
import Api, { setToken } from "../../Api/axios";
import { useDataLayerValue } from "../../DataLayer/DataLayer";
import Success from "../ErrorSuccess/Success";
import Error from "../ErrorSuccess/Error";
import "./add.css";

const AddStudent = () => {
  const [{ userDetails }, dispatch] = useDataLayerValue();
  const [newUserData, setNewUserData] = useState({
    schoolId: userDetails?.schoolId,
    schoolName: userDetails?.schoolName,
  });
  const [succMessage, setSuccMessage] = useState();
  const [errMessage, setErrMessage] = useState();
  const inputFields = [
    {
      id: "name",
      name: "name",
      placeholder: "Student Name",
      type: "text",
      required: true,
    },
    {
      id: "username",
      name: "username",
      placeholder: "Student User Name",
      type: "text",
    },
    {
      id: "email",
      name: "email",
      placeholder: "Student Email id",
      type: "email",
      required: true,
    },

    {
      id: "password",
      name: "password",
      placeholder: "Student Password",
      type: "password",
      required: true,
    },
    {
      id: "contactNumber",
      name: "contactNumber",
      placeholder: "Student Contact Number",
      type: "text",
      required: true,
    },
  ];
  const inputData = (e) => {
    setNewUserData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const addNewUser = async (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });

    await Api.post("/user/student", newUserData)
      .then((res) => {
        dispatch({
          type: "SET_LOADING",
          loading: false,
        });
        setSuccMessage("Student added successfully");
      })
      .catch((err) => {
        setErrMessage(err.response.data.message);
        setSuccMessage();
        dispatch({
          type: "SET_LOADING",
          loading: false,
        });
      });
  };

  return (
    <div className="container">
      <h2>Add Student</h2>
      <form
        onSubmit={(e) => {
          addNewUser(e);
        }}
      >
        {inputFields.map((field) => (
          <input
            key={field.id}
            id={field.id}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            className="input"
            onChange={(e) => {
              inputData(e);
            }}
            required={field?.required ? true : false}
          />
        ))}
        {succMessage ? (
          <Success message={succMessage} />
        ) : errMessage ? (
          <Error message={errMessage} />
        ) : (
          ""
        )}
        <button type="submit" className="btn btn-add">
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
