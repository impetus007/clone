import React, { useState, useEffect } from "react";
import Api from "../../../../Api/axios";
import "./newcontent.css";
import Error from "../../../ErrorSuccess/Error";
import Success from "../../../ErrorSuccess/Success";
import { useDataLayerValue } from "../../../../DataLayer/DataLayer";

function AddSubTopic() {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classSubjects, setClassSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [topics, setTopics] = useState([]);
  const [errMessage, setErrMessage] = useState();
  const [succMessage, setSuccMessage] = useState();
  const [newContentDetails, setNewContentDetails] = useState({});
  const [{ loading }, dispatch] = useDataLayerValue();

  useEffect(() => {
    getClasses();
  }, []);

  const getClasses = async () => {
    let classesTemp = [];
    let subTemp = [];
    let classIds = [];
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
        classesTemp = res.data;
        setErrMessage();
      })
      .catch((err) => {
        setSuccMessage();
        setErrMessage(err?.response?.data?.message);
      });

    setClasses(classesTemp);
    setSubjects(subTemp);
  };

  const handleInputChange = (e) => {
    if (e.target.id === "file") {
      setNewContentDetails({
        ...newContentDetails,
        [e.target.id]: e.target.files[0],
      });
    } else {
      setNewContentDetails({
        ...newContentDetails,
        [e.target.id]: e.target.value,
      });
    }
  };

  const selectClassFunc = (e) => {
    handleInputChange(e);
    const { value } = e.target;
    const subjectsTemp = subjects;
    let classSubjects = subjectsTemp.filter(
      (sub) => sub.classroom_id === value
    );
    setClassSubjects(classSubjects);
  };

  const selectSubjectFunc = async (e) => {
    handleInputChange(e);
    const { value } = e.target;
    let chaptersTemp = [];
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
    setChapters(chaptersTemp);
  };
  const selectChapterFunc = async (e) => {
    handleInputChange(e);
    const { value } = e.target;
    let topicTemp = [];
    await Api.get("/live-class/topic", {
      params: {
        classroom_id: newContentDetails.classroom_id,
        subject_id: newContentDetails.subject_id,
        chapter_id: value,
      },
    })
      .then((res) => {
        res.data.forEach((d) => {
          topicTemp.push(d);
        });
      })
      .catch((err) => {
        setSuccMessage();
        setErrMessage(err?.response?.data?.message);
      });

    setTopics(topicTemp);
  };

  const addNewContentFunc = async (e) => {
    e.preventDefault();
    setSuccMessage();
    setErrMessage();

    dispatch({
      type: "SET_LOADING",
      loading: true,
    });

    const dataToPush = {
      name: newContentDetails.name,
      topic_id: newContentDetails.topic_id,
      file: newContentDetails.file,
      data_type: newContentDetails.data_type,
    };

    const XHR = new XMLHttpRequest(),
      FD = new FormData();

    let keys = Object.keys(dataToPush);
    let values = Object.values(dataToPush);
    keys.forEach((key, i) => {
      FD.append(key, values[i]);
    });

    // // Define what happens on successful data submission
    XHR.addEventListener("load", function (event) {
      dispatch({
        type: "SET_LOADING",
        loading: false,
      });
      setSuccMessage("Sub Topic Added successfully");
      setErrMessage();
    });

    // // Define what happens in case of error
    XHR.addEventListener(" error", function (event) {
      setSuccMessage();
      setErrMessage("Something went wrong ... please try again later!");
    });

    // Set up request
    XHR.open(
      "POST",
      "http://ec2.youthindiaeschool.com/api/v1/live-class/add-sub-topic"
    );

    // Set headers
    XHR.setRequestHeader(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );

    // Send the FormData object; HTTP headers are set automatically
    XHR.send(FD);
  };

  return (
    <div className="addContent">
      <div className="addContent-container">
        <div className="addContainer-title">Add Sub Topic</div>
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
                  {cl?.class_name_section}
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
            <label htmlFor="subject_id">Select Chapter</label>
            <select
              name="chapter_id"
              id="chapter_id"
              onChange={(e) => selectChapterFunc(e)}
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
            <label htmlFor="topic_id">Select Topic</label>
            <select
              name="topic_id"
              id="topic_id"
              onChange={(e) => handleInputChange(e)}
              required
            >
              <option value="">Select Topic</option>
              {topics?.map((top, i) => (
                <option value={top._id} key={i}>
                  {top?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="addContainer-inp">
            <label htmlFor="file">Sub Topic File Type</label>
            <select
              name="data_type"
              id="data_type"
              onChange={(e) => handleInputChange(e)}
            >
              <option value="">Select File Type</option>
              <option value="PDF">Pdf</option>
              <option value="VIDEO">Video</option>
            </select>
          </div>
          <div className="addContainer-inp">
            <label htmlFor="name">Sub Topic Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="eg: Law of motion"
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>
          <div className="addContainer-inp">
            <label htmlFor="file">Sub Topic File</label>
            <input
              type="file"
              name="file"
              id="file"
              disabled={
                newContentDetails.data_type === undefined ||
                newContentDetails.data_type === ""
                  ? true
                  : false
              }
              accept={
                newContentDetails.data_type === "PDF"
                  ? "application/pdf,application/vnd.ms-excel"
                  : "video/mp4,video/x-m4v,video/*"
              }
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
          <button type="submit">Add Sub Topic</button>
        </form>
      </div>
    </div>
  );
}

export default AddSubTopic;
