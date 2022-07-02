import React, { useState, useEffect } from "react";
import Api from "../../../../Api/axios";
import "./newcontent.css";
import Error from "../../../ErrorSuccess/Error";
import Success from "../../../ErrorSuccess/Success";

function AddChapter() {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classSubjects, setClassSubjects] = useState([]);
  const [errMessage, setErrMessage] = useState();
  const [succMessage, setSuccMessage] = useState();
  const [newContentDetails, setNewContentDetails] = useState({});

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
    setNewContentDetails({
      ...newContentDetails,
      [e.target.id]: e.target.value,
    });
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

  const addNewContentFunc = async (e) => {
    e.preventDefault();
    setSuccMessage();
    setErrMessage();
    const dataToPush = {
      name: newContentDetails.name,
      subject_id: newContentDetails.subject_id,
    };
    await Api.post("/live-class/add-chapter", dataToPush)
      .then((res) => {
        setSuccMessage("New Chapter Added");
        setErrMessage();
      })
      .catch((err) => {
        setErrMessage(err?.response?.data?.message);
        setSuccMessage();
      });
  };

  return (
    <div className="addContent">
      <div className="addContent-container">
        <div className="addContainer-title">Add Chapter</div>
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
              onChange={(e) => handleInputChange(e)}
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
            <label htmlFor="name">Chapter</label>
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
          <button type="submit">Add Chapter</button>
        </form>
      </div>
    </div>
  );
}

export default AddChapter;
