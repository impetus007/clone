import React, { useEffect, useState } from "react";
import "./Tlibrary.css";
import { Link } from "react-router-dom";
import Api from "../../../Api/axios";
import Library_Toggler from "../Library_Toggler";
import { useDataLayerValue } from "../../../DataLayer/DataLayer";

const Tlibrary = () => {
  const [selectedClass, setSelectedClass] = useState();
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [{ lib_type }, dispatch] = useDataLayerValue();

  useEffect(() => {
    getClasses();
  }, []);

  const getClasses = async () => {
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });
    let classesTemp = [];
    let subTemp = [];
    let classIds = [];
    await Api.get("/live-class/subjects-teached")
      .then((res) => {
        subTemp = res.data;
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
      });

    // Get class ids
    subTemp.forEach((sub) => {
      classIds.push(sub.classroom_id);
    });

    // Get corresponding classes
    await Api.post("/live-class/get-all-classes", { data: classIds })
      .then((res) => {
        classesTemp = res.data;
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
      });

    setClasses(classesTemp);
    dispatch({
      type: "SET_LOADING",
      loading: false,
    });
  };

  const getClassProgressFunc = async (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });
    let targetClassSubs = [];
    let subjectIds = [];
    await Api.get("/live-class/subjects-teached")
      .then((res) => {
        targetClassSubs = res.data.filter(
          (cl) => cl.classroom_id === selectedClass
        );
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
      });
    await Promise.all(
      targetClassSubs.map(async (sub) => {
        try {
          let res = await Api.get("/live-class/get-class-progress", {
            params: { class: "Subject", id: sub._id },
          });
          let done = res.data.completion_count;
          let total = res.data.total_students;
          let percentage = (done / total) * 100;
          sub.completion = percentage.toFixed(0);
        } catch (err) {
          console.log(err?.response?.data?.message);
        }
      })
    );
    await Promise.all(
      targetClassSubs.map(async (sub) => {
        try {
          let res = await Api.get("/live-class/get-progress", {
            params: { class: "Subject", id: sub._id },
          });
          let done = res.data.subtopics_done;
          let total = res.data.subtopics_total;
          let percentage = (done / total) * 100;
          sub.taught = percentage.toFixed(0);
        } catch (err) {
          console.log(err?.response?.data?.message);
        }
      })
    );

    setSubjects(targetClassSubs);
    dispatch({
      type: "SET_LOADING",
      loading: false,
    });
  };

  return (
    <>
      <Library_Toggler />
      <div className="Tlibrary">
        <div className="Tlibrary-outer-container">
          {lib_type === "SCHOOL_LIBRARY" && (
            <>
              <form
                className="Tlib-selector"
                onSubmit={(e) => getClassProgressFunc(e)}
              >
                <select
                  name="classroom_id"
                  id="classroom_id"
                  onChange={(e) => setSelectedClass(e.target.value)}
                  required
                >
                  <option value="">Select Class</option>
                  {classes?.map((cl, i) => (
                    <option value={cl._id} key={i}>
                      {cl.class_name_section}
                    </option>
                  ))}
                </select>
                <button type="submit">Get Class Progress</button>
              </form>
              <div className="Tlibrary-container">
                <div className="Tlibrary-table">
                  <h3>Content Taught</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Subject</th>
                        <th>Completion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjects?.map((sub, i) => (
                        <tr key={i}>
                          <td>{sub?.name}</td>
                          <td>
                            {sub.taught !== undefined
                              ? `${sub?.taught}%`
                              : "--"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="Tlibrary-table">
                  <h3>Student Completion</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Subject</th>
                        <th>Completion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjects?.map((sub, i) => (
                        <tr key={i}>
                          <td>{sub?.name}</td>
                          <td>
                            {sub.completion !== undefined
                              ? `${sub?.completion}%`
                              : "--"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
          <div className="button-library">
            <Link to={`Uploaded-content/`}>
              <button>View Uploaded Content</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tlibrary;
