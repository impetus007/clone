import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Api from "../../../Api/axios";

function Academic() {
  const [doc, setDoc] = useState([]);

  const fetchDocument = async () => {
    await Api.get("/document")
      .then((res) => setDoc(res.data))
      .catch((error) => {
        // console.log(err.response.data.message)
      });
  };

  useEffect(() => {
    fetchDocument();
  }, []);

  return (
    <div>
      <div>Academic</div>
      <select>
        <option>select class</option>
        <option>Class 5</option>
        <option>class 6</option>
      </select>
      <select>
        <option>select section</option>
        <option>A</option>
        <option>B</option>
      </select>
      <NavLink to="/document/academic">Generate Link</NavLink>
      {/* <div>
        <select>
          <option>Select Class</option>
          <option>class 5</option>
          <option>class 6</option>
        </select>
        <select>
          <option>Select Section</option>
          <option>A</option>
          <option>B</option>
        </select>
        <NavLink>Generate Link</NavLink>
      </div> */}

      <div>
        {doc?.map((j) => {
          return (
            <>
              <h5>{j?.title}</h5>
              <p>j?.description</p>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Academic;
