import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Api from "../../../Api/axios";
import { useDataLayerValue } from "../../../DataLayer/DataLayer";

function Adddocument() {
  const [errMessage, setErrMessage] = useState();
  const [succMessage, setSuccMessage] = useState();
  const [{ userDetails, loading }, dispatch] = useDataLayerValue();
  const [document, setDocument] = useState({
    select_class: "",
    select_section: "",
    title: "",
    description: "",
  });

  const handleinput = (e) => {
    setDocument({ ...document, [e.target.id]: e.target.value });
  };

  const addDocument = (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });
    const XHR = new XMLHttpRequest(),
      FD = new FormData();

    let keys = Object.keys(setDocument);
    let values = Object.values(setDocument);
    keys.forEach((key, i) => {
      FD.append(key, values[i]);
    });

    // Define what happens on successful data submission
    XHR.addEventListener("load", function (event) {
      dispatch({
        type: "SET_LOADING",
        loading: false,
      });
      setSuccMessage("Document Created Successfully");
      setErrMessage();
    });

    // Define what happens in case of error
    XHR.addEventListener(" error", function (event) {
      setSuccMessage();
      setErrMessage("Something went wrong ... please try again later!");
    });

    // Set up request
    XHR.open("POST", "http://ec2.youthindiaeschool.com/api/v1/documents");

    // Set headers
    XHR.setRequestHeader(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );

    // Send the FormData object; HTTP headers are set automatically
    XHR.send(FD);
  };

  return (
    <form
      action=""
      name="form"
      id="form"
      onSubmit={(e) => {
        addDocument();
      }}
    >
      <div>
        <div>
          <select name="select_class" id="select_class" onChange={handleinput}>
            <option>Select class</option>
            <option>class 5</option>
            <option>class 6</option>
          </select>
        </div>
        <div>
          <select
            name="select_section"
            id="select_section"
            onChange={handleinput}
          >
            <option>Select Section</option>
            <option>a</option>
            <option>b</option>
          </select>
        </div>
      </div>
      <div>
        <input
          name="title"
          id="title"
          onChange={handleinput}
          type="text"
          placeholder="title"
          style={{ width: 400 }}
        />
      </div>
      <div>
        <textarea
          name="description"
          id="description"
          onChange={handleinput}
          style={{ width: 400 }}
          placeholder="description"
          rows="10"
        />
      </div>
      <div>
        <input
          name="filename"
          id="filename"
          onChange={handleinput}
          type="file"
        />
      </div>
      <button type="submit">Add Document</button>
      <NavLink to="/document">
        <button>back</button>
      </NavLink>
    </form>
  );
}

export default Adddocument;
