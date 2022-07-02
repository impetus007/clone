import React, { useEffect, useState } from "react";
import Api, { setToken } from "../../Api/axios";
import "./add.css";
import axios from "axios";
import { useDataLayerValue } from "../../DataLayer/DataLayer";

const AddCentral = () => {
  const [newUserData, setNewUserData] = useState({});
  const [{ userDetails }, dispatch] = useDataLayerValue();

  const inputFields = [
    {
      id: "name",
      name: "name",
      placeholder: "Central Name",
      type: "text",
    },
    {
      id: "email",
      name: "email",
      placeholder: "Central Email",
      type: "email",
    },
    {
      id: "password",
      name: "password",
      placeholder: "Central Password",
      type: "password",
    },
    {
      id: "username",
      name: "userName",
      placeholder: "Central User Name",
      type: "text",
    },
    {
      id: "contactNumber",
      name: "contactNumber",
      placeholder: "Central Contact Number",
      type: "text",
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
    await Api.post("/user/central", newUserData)
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err)
      });
  };

  return (
    <div className="container">
      <h2>Add Central</h2>
      <form onSubmit={(e) => addNewUser(e)}>
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
            required
          />
        ))}

        <button type="submit" className="btn btn-add">
          Add Central
        </button>
      </form>
    </div>
  );
};

export default AddCentral;
