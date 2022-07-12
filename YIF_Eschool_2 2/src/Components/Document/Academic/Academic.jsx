import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Api from "../../../Api/axios";

function Academic() {
  const [doc, setDoc] = useState([]);
  const [clas, setClas] = useState("");
  const [section, setSection] = useState("");
  const [show, setShow] = useState(false);

  const fetchDocument = async () => {
    await Api.get(`documents?document_for=${clas} ${section}&type=Academic`)

      .then((res) => {
        setDoc(res.data);
        console.log(res);
      })
      .catch((error) => {
        // console.log(err.response.data.message)
      });
  };

  useEffect(() => {
    fetchDocument();
  }, [clas, section]);

  const showData = () => {
    setShow(true);
  };
  return (
    <div>
      <div>Academic</div>
      <select
        name="clas"
        id="clas"
        selected
        onChange={(e) => setClas(e.target.value)}
      >
        <option value="0" selected>
          select class
        </option>
        <option>5</option>
        <option>6</option>
      </select>
      <select
        name="section"
        id="section"
        selected
        onChange={(e) => setSection(e.target.value)}
      >
        <option>select section</option>
        <option>A</option>
        <option>B</option>
      </select>
      <NavLink to="/document/academic" onClick={showData}>
        Generate Link
      </NavLink>
      <div>
        <table>
          <tr>
            <th>Sr.no</th>
            <th>class</th>
            <th>Description</th>
            <th>file</th>
          </tr>
          {show &&
            doc?.map((j, i) => {
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>{j.document_for}</td>
                  <td>{j.description}</td>
                  <td>{j.link}</td>
                </tr>
              );
            })}
        </table>
      </div>
    </div>
  );
}

export default Academic;
