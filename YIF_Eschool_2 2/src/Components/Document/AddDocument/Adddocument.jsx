

import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Api from "../../../Api/axios";
import { useDataLayerValue } from "../../../DataLayer/DataLayer";
import Error from "../../ErrorSuccess/Error";
import Success from "../../ErrorSuccess/Success";
//import Links from '../Links';

const AddDocument_Admin = () => {
  const [classNo, setClassNo] = useState("");
  const [section, setSection] = useState("");
  const [classes, setClasses] = useState([]);
  const [succMessage, setSuccMessage] = useState();
  const [errMessage, setErrMessage] = useState();
  const [{ userDetails }, dispatch] = useDataLayerValue();
  const [documentData, setDocumentData] = useState({
    document_type: "Academic",
  });

  const handleInputChange = (e) => {
    if (e.target.id === "file") {
      setDocumentData({ ...documentData, [e.target.id]: e.target.files[0] });
    } else {
      setDocumentData({
        ...documentData,
        document_for: `${classNo} ${section}`,
        [e.target.id]: e.target.value,
      });
    }
  };

  const addDocuments = (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });
    const XHR = new XMLHttpRequest(),
      FD = new FormData();

    let keys = Object.keys(documentData);
    let values = Object.values(documentData);
    keys.forEach((key, i) => {
      FD.append(key, values[i]);
      console.log(key, values[i]);
    });

    // Define what happens on successful data submission
    XHR.addEventListener("load", function (event) {
      dispatch({
        type: "SET_LOADING",
        loading: false,
      });
      setSuccMessage("Document created successfully");
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
    <div>
     

      <form
        onSubmit={(e) => {
          addDocuments(e);
        }}
        className="form"
      >
        <div>
          <select
            name="class"
            id="class"
            onChange={(e) => setClassNo(e.target.value)}
            required
          >
            <option value="0" selected>
              Select Class
            </option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
          </select>

          <select
            name="section"
            id="section"
            onChange={(e) => setSection(e.target.value)}
            required
          >
            <option value="0" selected>
              Select Section
            </option>
            <option>A</option>
            <option>B</option>
          </select>
        </div>

        <div>
          <input
            className="input"
            type="text"
            id="name"
            style={{width:400}}
            placeholder="Enter document title"
            onChange={(e) => {
              handleInputChange(e);
            }}
            required
          />
        </div>

        <div>
          <textarea
            className="input"
            name="description"
            id="description"
            cols="30"
            rows="10"
            style={{width:400}}
            placeholder="Enter Description"
            onChange={(e) => {
              handleInputChange(e);
            }}
            required
          ></textarea>
        </div>

        <div>
          <input
            name="file"
            id="file"
            type="file"
            onChange={(e) => {
              handleInputChange(e);
            }}
            accept="application/pdf"
          />
        </div>
        <div>
          {succMessage ? (
            <Success message={succMessage} />
          ) : errMessage ? (
            <Error message={errMessage} />
          ) : (
            ""
          )}
          <button type="submit">Add Document</button>
          <Link to="/document">
            <button>Back</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddDocument_Admin;
