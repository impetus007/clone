import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ad_lib.css";
import Api from "../../../Api/axios";
import { useDataLayerValue } from "../../../DataLayer/DataLayer";

function School_Admin_Library_Chooser() {
  const [selectedClassData, setSelectedClassData] = useState({});
  const [allClasses, setAllClasses] = useState([]);
  const [libParams, setLibParams] = useState({});
  const navigate = useNavigate();
  const [errMessage, setErrMessage] = useState();
  const [succMessage, setSuccMessage] = useState();
  const [{ lib_type }, dispatch] = useDataLayerValue();

  useEffect(() => {
    fetchAllClasses();
  }, [lib_type]);

  const fetchAllClasses = async () => {
    let tempClass = [];
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });
    if (lib_type === "SCHOOL_LIBRARY") {
      await Api.get("/live-class")
        .then((res) => {
          tempClass = res.data;
        })
        .catch((err) => console.log(err.response.data.message));
      tempClass.sort((a, b) =>
        a.class_name_section > b.class_name_section ? 1 : -1
      );
    } else {
      await Api.get("/live-class/inhouse-classes")
        .then((res) => {
          tempClass = res.data.sort((a, b) =>
            a.class_name > b.class_name ? 1 : -1
          );
          setErrMessage();
        })
        .catch((err) => {
          setSuccMessage();
          setErrMessage(err?.response?.data?.message);
        });
    }
    setAllClasses(tempClass);
    dispatch({
      type: "SET_LOADING",
      loading: false,
    });
  };

  const changeLibParams = (e) => {
    setLibParams((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const selectClassFunc = (e) => {
    const { value } = e.target;
    changeLibParams(e);
    const _selectedClassDataTemp = allClasses.filter(
      (data) => value === data._id
    )[0];
    console.log(_selectedClassDataTemp);
    setSelectedClassData(_selectedClassDataTemp);
  };

  const showLibraryContent = (e) => {
    e.preventDefault();
    navigate(`/library/${libParams.class}/${libParams.sub}`);
  };
  const completionFormSubmit = (e) => {
    e.preventDefault();
    navigate(`/library/progress/${libParams.class}/${libParams.sub}`);
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
                {lib_type === "SCHOOL_LIBRARY"
                  ? cl?.class_name_section
                  : cl?.class_name}
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

            {selectedClassData?.subjects?.map((sub, i) => (
              <option value={selectedClassData?.subject_ids[i]} key={i}>
                {sub}
              </option>
            ))}
          </select>
          <button type="submit">Go</button>
        </form>
      </div>

      {lib_type === "SCHOOL_LIBRARY" && (
        <div className="ad-lib-con">
          <h4>Content Completion</h4>

          <form onSubmit={(e) => completionFormSubmit(e)}>
            <select
              name="class"
              id="class"
              onChange={(e) => selectClassFunc(e)}
              required
            >
              <option value="">Select Class</option>
              {allClasses?.map((cl, i) => (
                <option value={cl?._id} key={i}>
                  {lib_type === "SCHOOL_LIBRARY"
                    ? cl?.class_name_section
                    : cl?.class_name}
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

              {selectedClassData?.subjects?.map((sub, i) => (
                <option value={selectedClassData?.subject_ids[i]} key={i}>
                  {sub}
                </option>
              ))}
            </select>
            <button type="submit">Apply Filter</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default School_Admin_Library_Chooser;
