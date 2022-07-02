import React, { useState, useEffect } from "react";
import "./Uploaded.css";
import { Link, useParams } from "react-router-dom";
import Library_Toggler from "../../Library_Toggler";
import Api from "../../../../Api/axios";
import { useDataLayerValue } from "../../../../DataLayer/DataLayer";

const Uploaded_content = () => {
  const [selectedClassData, setSelectedClassData] = useState({});
  const [libParams, setLibParams] = useState();
  const [showTable, setShowTable] = useState(false);
  const [classList, setClassList] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classSubjects, setClassSubjects] = useState([]);
  const [errMessage, setErrMessage] = useState();
  const [succMessage, setSuccMessage] = useState();
  const [chapterDetails, setChapterDetails] = useState([]);
  const [{ userDetails, lib_type }, dispatch] = useDataLayerValue();
  const urlParams = useParams();
  const changeLibParams = (e) => {
    setLibParams((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  useEffect(() => {
    getClasses();
  }, [lib_type]);

  const getClasses = async () => {
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });
    setLibParams({});
    setShowTable(false);
    let classesTemp = [];
    let subTemp = [];
    let classIds = [];
    if (lib_type === "SCHOOL_LIBRARY") {
      await Api.get("/live-class/subjects-teached")
        .then((res) => {
          subTemp = res.data;
          setErrMessage();
        })
        .catch((err) => {
          setSuccMessage();
          setErrMessage(err?.response?.data?.message);
        });

      // Get class ids
      subTemp.forEach((sub) => {
        classIds.push(sub.classroom_id);
      });

      // Get corresponding classes
      await Api.post("/live-class/get-all-classes", { data: classIds })
        .then((res) => {
          setClasses(res.data);
          setErrMessage();
        })
        .catch((err) => {
          setSuccMessage();
          setErrMessage(err?.response?.data?.message);
        });
      setSubjects(subTemp);
    } else {
      await Api.get("/live-class/inhouse-classes")
        .then((res) => {
          setClasses(
            res.data.sort((a, b) => (a.class_name > b.class_name ? 1 : -1))
          );
          setErrMessage();
        })
        .catch((err) => {
          setSuccMessage();
          setErrMessage(err?.response?.data?.message);
        });
    }

    dispatch({
      type: "SET_LOADING",
      loading: false,
    });
  };

  const selectClassFunc = async (e) => {
    changeLibParams(e);
    const { value } = e.target;
    if (lib_type === "SCHOOL_LIBRARY") {
      const { value } = e.target;
      const subjectsTemp = subjects;
      let classSubjectsTemp = subjectsTemp.filter(
        (sub) => sub.classroom_id === value
      );
      setClassSubjects(classSubjectsTemp);
    } else {
      await Api.get("/live-class/subject", {
        params: { classroom_id: value },
      })
        .then((res) => {
          setClassSubjects(res.data);
        })
        .catch((err) => {
          setSuccMessage();
          setErrMessage(err?.response?.data?.message);
        });
    }
  };

  const getChapters = async () => {
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });
    let chaptersTemp = [];
    await Api.get("/live-class/chapter", {
      params: {
        classroom_id: libParams.classroom_id,
        subject_id: libParams.subject_id,
      },
    })
      .then((res) => {
        chaptersTemp = res.data;
      })
      .catch((err) => console.log(err?.response?.data?.message));

    if (lib_type === "SCHOOL_LIBRARY") {
      await Promise.all(
        chaptersTemp.map(async (chap) => {
          try {
            let res = await Api.get("/live-class/get-class-progress", {
              params: { class: "Chapter", id: chap._id },
            });
            let done = res.data.completion_count;
            let total = res.data.total_students;
            let percentage = (done / total) * 100;
            chap.completion = percentage.toFixed(0);
          } catch (err) {
            console.log(err?.response?.data?.message);
          }
        })
      );
      await Promise.all(
        chaptersTemp.map(async (chap) => {
          try {
            let res = await Api.get("/live-class/get-progress", {
              params: { class: "Chapter", id: chap._id },
            });
            let done = res.data.subtopics_done;
            let total = res.data.subtopics_total;
            let percentage = (done / total) * 100;
            chap.taught = percentage.toFixed(0);
          } catch (err) {
            console.log(err?.response?.data?.message);
          }
        })
      );
    }

    setChapterDetails(chaptersTemp);
    dispatch({
      type: "SET_LOADING",
      loading: false,
    });
  };

  const changeTimeFormat = (time) => {
    const d = new Date(time);
    const newDateFormat = `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()}`;
    return newDateFormat;
  };

  return (
    <>
      <Library_Toggler />
      <div className="Uploaded">
        <div className="Uploaded-main-container">
          <form
            className="Uploaded-container"
            onSubmit={(e) => {
              e.preventDefault();
              setShowTable(true);
              getChapters();
            }}
          >
            <select
              name="classroom_id"
              id="classroom_id"
              value={libParams?.classroom_id ? libParams?.classroom_id : ""}
              onChange={(e) => selectClassFunc(e)}
              required
            >
              <option value="">Select Class</option>
              {classes?.map((cl, i) => (
                <option value={cl._id} key={i}>
                  {lib_type === "SCHOOL_LIBRARY"
                    ? cl?.class_name_section
                    : cl?.class_name}
                </option>
              ))}
            </select>
            <select
              className="Uploaded-select"
              name="subject_id"
              id="subject_id"
              value={libParams?.subject_id ? libParams?.subject_id : ""}
              onChange={(e) => changeLibParams(e)}
              required
            >
              <option value="">Select Subject</option>

              {classSubjects?.map((sub, i) => (
                <option value={sub._id} key={i}>
                  {sub?.name}
                </option>
              ))}
            </select>
            <div className="Uploaded-button">
              <button>Apply Filter</button>
              <Link to="../library">
                <button>Back</button>
              </Link>
            </div>
          </form>
          {showTable && (
            <table className="Apply-table">
              <thead>
                <tr>
                  <th>Chapters</th>
                  <th>Uploaded Date</th>
                  {lib_type === "SCHOOL_LIBRARY" && (
                    <>
                      <th>Student Completion</th>
                      <th>Content Taught</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {chapterDetails?.map((ch, i) => (
                  <tr key={i}>
                    <td
                    // onClick={() => selectChapter(ch?.name)}
                    >
                      <Link
                        to={`/library/player/${libParams.classroom_id}/${libParams.subject_id}/${ch?._id}`}
                      >
                        {ch?.name}
                      </Link>
                    </td>
                    <td>{changeTimeFormat(ch?.createdAt)}</td>
                    {lib_type === "SCHOOL_LIBRARY" && (
                      <>
                        <td>
                          {ch.completion !== undefined
                            ? `${ch?.completion}%`
                            : "--"}
                        </td>
                        <td>
                          {ch.taught !== undefined ? `${ch?.taught}%` : "--"}
                        </td>{" "}
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Uploaded_content;
