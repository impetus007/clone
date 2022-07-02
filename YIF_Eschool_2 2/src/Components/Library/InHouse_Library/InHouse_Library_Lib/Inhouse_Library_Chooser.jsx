import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ad_lib.css";
import Api from "../../../../Api/axios";
import Error from "../../../ErrorSuccess/Error";
import Success from "../../../ErrorSuccess/Success";
import { useDataLayerValue } from "../../../../DataLayer/DataLayer";

function School_Admin_Library_Chooser() {
  const [selectedClassData, setSelectedClassData] = useState({});
  const [allClasses, setAllClasses] = useState([]);
  const [libParams, setLibParams] = useState({});
  const [classSubjects, setClassSubjects] = useState([]);
  const [errMessage, setErrMessage] = useState();
  const [succMessage, setSuccMessage] = useState();
  const navigate = useNavigate();
  const [{ loading }, dispatch] = useDataLayerValue();

  useEffect(() => {
    fetchAllClasses();
  }, []);

  const fetchAllClasses = async () => {
    let tempClass = [];
    await Api.get("/live-class/get-inhouse-classes-central")
      .then((res) => {
        tempClass = res.data;
      })
      .catch((err) => console.log(err.response.data.message));
    tempClass.sort((a, b) =>
      a.class_name_section > b.class_name_section ? 1 : -1
    );
    setAllClasses(tempClass);
  };

  const changeLibParams = (e) => {
    setLibParams((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const selectClassFunc = async (e) => {
    const { value } = e.target;
    changeLibParams(e);
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

  const showLibraryContent = (e) => {
    e.preventDefault();
    navigate(`/library/${libParams.class}/${libParams.sub}`);
  };

  return (
    <div className="ad-lib-ch">
      <div className="ad-lib-library">
        <h4>Library</h4>
        <form onSubmit={(e) => showLibraryContent(e)}>
          <select
            name="class"
            id="class"
            onChange={(e) => selectClassFunc(e)}
            required
          >
            <option value="">Select Class</option>
            {allClasses?.map((cl, i) => (
              <option value={cl?._id} key={i}>
                {cl?.class_name}
              </option>
            ))}
          </select>

          <select
            name="sub"
            id="sub"
            onChange={(e) => changeLibParams(e)}
            required
          >
            <option value="">Select Subject</option>

            {classSubjects?.map((sub, i) => (
              <option value={sub?._id} key={i}>
                {sub?.name}
              </option>
            ))}
          </select>
          <button type="submit">Go</button>
        </form>
      </div>
    </div>
  );
}

export default School_Admin_Library_Chooser;
