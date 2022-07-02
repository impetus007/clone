import React, { useState, useEffect } from "react";
import "./ad_lib.css";
import { useParams } from "react-router-dom";
import Api from "../../../../Api/axios";
import { Link } from "react-router-dom";

function School_Admin_Library_Lib() {
  const [chapters, setChapters] = useState([]);
  const [classDetails, setClassDetails] = useState({});
  const urlParams = useParams();

  useEffect(() => {
    getChapters();
  }, []);

  const getChapters = async () => {
    let subInd = -1;
    let tempClassDetails = {};
    let chaptersTemp = [];
    await Api.get("/live-class/chapter", {
      params: {
        classroom_id: urlParams.classroomId,
        subject_id: urlParams.subjectId,
      },
    })
      .then((res) => {
        chaptersTemp = res.data;
      })
      .catch((err) => console.log(err));

    chaptersTemp.forEach(async (chap) => {
      await Api.get("/live-class/get-class-progress", {
        params: {
          class: "Chapter",
          id: chap._id,
        },
      }).then((res) => {
        let done = res.data.completion_count;
        let total = res.data.total_students;
        let percentage = (done / total) * 100;
        chap.completion = percentage.toFixed(0);
      });
    });

    await Promise.all(
      chaptersTemp.map(async (chap) => {
        try {
          let res = await Api.get("/live-class/get-class-progress", {
            params: {
              class: "Chapter",
              id: chap._id,
            },
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
    setChapters(chaptersTemp);
    await Api.get("/live-class/get-inhouse-classes-central")
      .then((res) => {
        let targetClass = res.data.filter(
          (cl) => cl._id === urlParams.classroomId
        )[0];
        console.log(targetClass);
        tempClassDetails.class_name = targetClass.class_name;
        targetClass.subject_ids.forEach((sub, i) => {
          if (sub === urlParams.subjectId) {
            tempClassDetails.subject = targetClass.subjects[i];
          }
        });
        setClassDetails(tempClassDetails);
      })
      .catch((err) => console.log(err));
  };

  const changeTimeFormat = (date) => {
    const d = new Date(date);
    const newDateFormat = `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()}`;
    return newDateFormat;
  };

  return (
    <div className="ad-lib-library-container">
      <div className="ad-lib-library-main-container">
        <Link to="/library">
          <button>Back</button>
        </Link>
        <div className="ad-lib-library-container-top">
          <p>Class : {classDetails?.class_name} </p>
          <p>Subject : {classDetails?.subject} </p>
        </div>
        <div className="ad-lib-library-container-mid">
          <table>
            <thead>
              <tr>
                <th>Chapter</th>
                <th>Upload Date</th>
              </tr>
            </thead>
            <tbody>
              {chapters?.map((ch, i) => (
                <tr key={i}>
                  <td>
                    <Link
                      to={`/library/player/${urlParams.classroomId}/${urlParams.subjectId}/${ch._id}`}
                    >
                      {ch?.name}
                    </Link>
                  </td>
                  <td>{changeTimeFormat(ch?.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default School_Admin_Library_Lib;
