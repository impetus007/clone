import React, { useState } from "react";
import Api, { setToken } from "../../Api/axios";
import { useDataLayerValue } from "../../DataLayer/DataLayer";
import Success from "../ErrorSuccess/Success";
import Error from "../ErrorSuccess/Error";
import "./add.css";

const AddSchoolAdmin = () => {
  const [newUserData, setNewUserData] = useState({});
  const [{ userDetails }, dispatch] = useDataLayerValue();
  const [succMessage, setSuccMessage] = useState();
  const [errMessage, setErrMessage] = useState();
  const inputFields = [
    {
      id: "name",
      name: "name",
      placeholder: "School Admin Name",
      type: "text",
      required: true,
    },
    {
      id: "username",
      name: "username",
      placeholder: "School Admin User Name",
      type: "text",
    },
    {
      id: "email",
      name: "email",
      placeholder: "School Admin Email id",
      type: "email",
      required: true,
    },

    {
      id: "password",
      name: "password",
      placeholder: "School Admin Password",
      type: "password",
      required: true,
    },
    {
      id: "contactNumber",
      name: "contactNumber",
      placeholder: "School Admin Contact Number",
      type: "text",
      required: true,
    },
    {
      id: "schoolName",
      name: "schoolName",
      placeholder: "Enter School Name",
      type: "text",
      required: true,
    },
    {
      id: "schoolId",
      name: "schoolId",
      placeholder: "Enter School Id",
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

    await Api.post("/user/school-admin", newUserData)
      .then((res) => {
        // console.log(res);
        dispatch({
          type: "SET_LOADING",
          loading: false,
        });
        setSuccMessage("School Admin added successfully");
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
      <h2>Add School Admin</h2>
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
          Add School Admin
        </button>
      </form>
    </div>
  );
};

export default AddSchoolAdmin;
