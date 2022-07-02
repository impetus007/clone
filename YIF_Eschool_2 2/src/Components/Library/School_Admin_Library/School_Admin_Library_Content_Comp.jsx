import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Api from "../../../Api/axios";
import "./ad_lib.css";

function School_Admin_Library_Content_Comp() {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [subjectDetails, setSubjectDetails] = useState({});
  const [chapterDetails, setChapterDetails] = useState([]);

  const getChapters = async () => {
    let chaptersTemp = [];

    await Api.get("/live-class/chapter", {
      params: {
        classroom_id: urlParams.classroomId,
        subject_id: urlParams.subjectId,
      },
    })
      .then((res) => {
        chaptersTemp = res.data;
        console.log(res.data);
      })
      .catch((err) => console.log(err?.response?.data?.message));

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
    await Promise.all(
      chaptersTemp.map(async (chap) => {
        try {
          let res = await Api.get("/live-class/get-student-progress", {
            params: {
              class: "Chapter",
              id: chap._id,
              student_id: chap.created_by,
            },
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

    setChapterDetails(chaptersTemp);
  };

  useEffect(() => {
    getChapters();
  }, []);

  return (
    <div className="ad-lib-content-container">
      <div className="ad-lib-main-content-container">
        <div>
          <button
            onClick={() => {
              navigate("/library");
            }}
          >
            Back
          </button>
        </div>

        <div className="ad-lib-con-details">
          <table>
            <thead>
              <tr>
                <th>sno</th>
                <th>Chapter</th>
                <th>Content Taught</th>
                <th>Student Completion</th>
                <th>Student Wise Report</th>
              </tr>
            </thead>
            <tbody>
              {chapterDetails?.map((chap, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{chap?.name}</td>

                  <td>
                    {chap.taught !== undefined ? `${chap?.taught}%` : "--"}
                  </td>
                  <td>
                    {chap.completion !== undefined
                      ? `${chap?.completion}%`
                      : "--"}
                  </td>

                  <td>
                    <Link
                      to={`/library/progress/student-wise/${urlParams.classroomId}/${urlParams.subjectId}/${chap?._id}`}
                    >
                      Report
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default School_Admin_Library_Content_Comp;
