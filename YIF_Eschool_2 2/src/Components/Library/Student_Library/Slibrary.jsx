import React, { useState, useEffect } from "react";
import "./Slibrary.css";
import { Link } from "react-router-dom";
import Slibrary_Topicwise from "./Slibrary_Topicwise";
import Library_Toggler from "../Library_Toggler";
import Api from "../../../Api/axios";
import { useDataLayerValue } from "../../../DataLayer/DataLayer";

const Slibrary = () => {
  const [classId, setClassId] = useState();
  const [subjects, setSubjects] = useState([]);
  const [errMessage, setErrMessage] = useState();
  const [succMessage, setSuccMessage] = useState();
  const [{ userDetails, lib_type }, dispatch] = useDataLayerValue();

  useEffect(() => {
    getSubjects();
  }, [lib_type]);

  const getSubjects = async () => {
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });
    let classIdTemp;
    let subjectsTemp = [];
    if (lib_type === "SCHOOL_LIBRARY") {
      try {
        const res = await Api.get("/live-class/library");
        classIdTemp = res.data[0].classroom_id;
        setClassId(classIdTemp);
      } catch (err) {
        console.log(err?.response?.data?.message);
      }

      await Api.get("/live-class/subject", {
        params: { classroom_id: classIdTemp },
      })
        .then(async (res) => {
          subjectsTemp = res.data;
        })
        .catch((err) => console.log(err?.response?.data?.message));

      await Promise.all(
        subjectsTemp.map(async (sub) => {
          try {
            let res = await Api.get("/live-class/get-progress", {
              params: { class: "Subject", id: sub._id },
            });
            let done = res.data.subtopics_done;
            let total = res.data.subtopics_total;
            let percentage = (done / total) * 100;
            sub.completion = percentage.toFixed(0);
          } catch (err) {
            console.log(err?.response?.data?.message);
          }
        })
      );
    }
    // else {
    //   let studentClass =
    //     userDetails.classes[userDetails.classes.length() - 1].split(" ")[0];
    //   let allInhouseClasses = [];
    //   await Api.get("/live-class/inhouse-classes")
    //     .then((res) => {
    //       allInhouseClasses = res.data.sort((a, b) =>
    //         a.class_name > b.class_name ? 1 : -1
    //       );
    //       setErrMessage();
    //     })
    //     .catch((err) => {
    //       setSuccMessage();
    //       setErrMessage(err?.response?.data?.message);
    //     });

    //   console.log(allInhouseClasses);
    // }
    setSubjects(subjectsTemp);

    dispatch({
      type: "SET_LOADING",
      loading: false,
    });
  };

  return (
    <>
      <Library_Toggler />
      <div>
        <table id="library" className="center w-70">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Completion</th>
            </tr>
          </thead>
          <tbody>
            {subjects?.map((sub, i) => (
              <tr key={i}>
                <td>
                  <Link to={`/library/topicwise/${classId}/${sub?._id}`}>
                    {sub?.name}
                  </Link>
                </td>
                <td>
                  {sub.completion !== undefined ? `${sub?.completion}%` : "--"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Slibrary;
