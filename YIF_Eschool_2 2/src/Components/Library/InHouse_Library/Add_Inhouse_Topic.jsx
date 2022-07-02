import React, { useState, useEffect } from "react";
import Api from "../../../Api/axios";
import "./newcontent.css";
import Error from "../../ErrorSuccess/Error";
import Success from "../../ErrorSuccess/Success";
import { useDataLayerValue } from "../../../DataLayer/DataLayer";

function Add_Inhouse_Topic() {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classSubjects, setClassSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [errMessage, setErrMessage] = useState();
  const [succMessage, setSuccMessage] = useState();
  const [newContentDetails, setNewContentDetails] = useState({});
  const [{ loading }, dispatch] = useDataLayerValue();

  useEffect(() => {
    getClasses();
  }, []);

  const getClasses = async () => {
    let classesTemp = [];
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });

    await Api.get("/live-class/get-inhouse-classes-central")
      .then((res) => {
        classesTemp = res.data.sort((a, b) =>
          a.class_name > b.class_name ? 1 : -1
        );
        setErrMessage();
      })
      .catch((err) => {
        setSuccMessage();
        setErrMessage(err?.response?.data?.message);
      });

    dispatch({
      type: "SET_LOADING",
      loading: false,
    });
    setClasses(classesTemp);
  };

  const handleInputChange = (e) => {
    setNewContentDetails({
      ...newContentDetails,
      [e.target.id]: e.target.value,
    });
  };

  const selectClassFunc = async (e) => {
    handleInputChange(e);
    const { value } = e.target;
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });
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
    dispatch({
      type: "SET_LOADING",
      loading: false,
    });
  };

  const selectSubjectFunc = async (e) => {
    handleInputChange(e);
    const { value } = e.target;
    let chaptersTemp = [];
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });
    await Api.get("/live-class/chapter", {
      params: {
        classroom_id: newContentDetails.classroom_id,
        subject_id: value,
      },
    })
      .then((res) => (chaptersTemp = res.data))
      .catch((err) => {
        setSuccMessage();
        setErrMessage(err?.response?.data?.message);
      });
    dispatch({
      type: "SET_LOADING",
      loading: false,
    });
    setChapters(chaptersTemp);
  };

  const addNewContentFunc = async (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });
    setSuccMessage();
    setErrMessage();
    const dataToPush = {
      name: newContentDetails.name,
      subject_id: newContentDetails.subject_id,
      chapter_id: newContentDetails.chapter_id,
    };
    await Api.post("/live-class/add-inhouse-topic", dataToPush)
      .then((res) => {
        setSuccMessage("New Topic Added");
        setErrMessage();
      })
      .catch((err) => {
        setErrMessage(err?.response?.data?.message);
        setSuccMessage();
      });
    dispatch({
      type: "SET_LOADING",
      loading: false,
    });
  };

  return (
    <div className="addContent">
      <div className="addContent-container">
        <div className="addContainer-title">Add Topic</div>
        <form
          className="addContainer-inputs"
          onSubmit={(e) => addNewContentFunc(e)}
        >
          <div className="addContainer-inp">
            <label htmlFor="classroom_id">Select Class</label>
            <select
              name="classroom_id"
              id="classroom_id"
              onChange={(e) => selectClassFunc(e)}
              required
            >
              <option value="">Select Class</option>
              {classes?.map((cl, i) => (
                <option value={cl._id} key={i}>
                  {cl?.class_name}
                </option>
              ))}
            </select>
          </div>
          <div className="addContainer-inp">
            <label htmlFor="subject_id">Select Subject</label>
            <select
              name="subject_id"
              id="subject_id"
              onChange={(e) => selectSubjectFunc(e)}
              required
            >
              <option value="">Select Subject</option>
              {classSubjects?.map((sub, i) => (
                <option value={sub._id} key={i}>
                  {sub?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="addContainer-inp">
            <label htmlFor="chapter_id">Select Chapter</label>
            <select
              name="chapter_id"
              id="chapter_id"
              onChange={(e) => handleInputChange(e)}
              required
            >
              <option value="">Select Chapter</option>
              {chapters?.map((ch, i) => (
                <option value={ch._id} key={i}>
                  {ch?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="addContainer-inp">
            <label htmlFor="name">Topic</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="eg: Law of motion"
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>

          {succMessage ? (
            <Success message={succMessage} />
          ) : errMessage ? (
            <Error message={errMessage} />
          ) : (
            ""
          )}
          <button type="submit">Add Topic</button>
        </form>
      </div>
    </div>
  );
}

export default Add_Inhouse_Topic;
