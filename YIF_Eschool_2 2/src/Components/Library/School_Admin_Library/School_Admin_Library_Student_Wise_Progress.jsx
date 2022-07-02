import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Api from "../../../Api/axios";
import "./ad_lib.css";

function School_Admin_Library_Student_Wise_Progress() {
  const urlParams = useParams();
  const navigate = useNavigate();
  const [studentsDetails, setStudentsDetails] = useState([]);

  useEffect(() => {
    getAllDetails();
  }, []);

  const getAllDetails = async () => {
    let studentsDetailsTemp = [];
    await Api.get("/live-class/get-students-by-class-id", {
      params: { classroom_id: urlParams.classroomId },
    })
      .then((res) => {
        studentsDetailsTemp = res.data;
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
      });

    await Promise.all(
      studentsDetailsTemp.map(async (st) => {
        try {
          let res = await Api.get("/live-class/get-student-progress", {
            params: {
              class: "Chapter",
              id: urlParams.chapterId,
              student_id: st?._id,
            },
          });
          let done = res.data.subtopics_done;
          let total = res.data.subtopics_total;
          let percentage = (done / total) * 100;
          st.chapterCompletion = percentage.toFixed(0);
        } catch (err) {
          console.log(err?.response?.data?.message);
        }
      })
    );
    await Promise.all(
      studentsDetailsTemp.map(async (st) => {
        try {
          let res = await Api.get("/live-class/get-student-progress", {
            params: {
              class: "Subject",
              id: urlParams.subjectId,
              student_id: st?._id,
            },
          });
          let done = res.data.subtopics_done;
          let total = res.data.subtopics_total;
          let percentage = (done / total) * 100;
          st.subjectCompletion = percentage.toFixed(0);
        } catch (err) {
          console.log(err?.response?.data?.message);
        }
      })
    );

    setStudentsDetails(studentsDetailsTemp);
  };

  return (
    <div className="ad-lib-st-wise">
      <div className="ad-lib-st-wise-container">
        <button onClick={() => navigate(-1)}>Back</button>
        <table>
          <thead>
            <th>sno</th>
            <th>Student Name</th>
            <th>Class</th>
            <th>Chapter Progress</th>
            <th>Subject Progress</th>
          </thead>
          <tbody>
            {studentsDetails?.map((st, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{st?.name}</td>
                <td>{st?.classes[st?.classes?.length - 1]}</td>
                <td>
                  {st.chapterCompletion !== undefined
                    ? `${st?.chapterCompletion}%`
                    : "--"}
                </td>
                <td>
                  {st.subjectCompletion !== undefined
                    ? `${st?.subjectCompletion}%`
                    : "--"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default School_Admin_Library_Student_Wise_Progress;
