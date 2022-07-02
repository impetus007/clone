import React, { useState, useEffect } from "react";
import "./Slibrary.css";
import { useParams, Link } from "react-router-dom";
import Chapter_progress from "./Chapter_progress";
import Api from "../../../Api/axios";

const Slibrary_Topicwise = ({ removeSubject, subData }) => {
  const [selectedChapter, setSelectedChapter] = useState();
  const [chapterDetails, setChapterDetails] = useState();
  const [progresses, setProgresses] = useState([]);
  const urlParams = useParams();

  useEffect(() => {
    getChapters();
  }, []);

  const getChapters = async () => {
    let chaptersTemp = [];
    await Api.get("/live-class/chapter", {
      params: {
        classroom_id: urlParams.classroom_id,
        subject_id: urlParams.subject_id,
      },
    })
      .then((res) => {
        chaptersTemp = res.data;
      })
      .catch((err) => console.log(err?.response?.data?.message));

    await Promise.all(
      chaptersTemp.map(async (chap) => {
        try {
          let res = await Api.get("/live-class/get-progress", {
            params: { class: "Chapter", id: chap._id },
          });
          let done = res.data.subtopics_done;
          let total = res.data.subtopics_total;
          let percentage = (done / total) * 100;
          chap.completion = percentage.toFixed(0);
        } catch (err) {
          console.log(err?.response?.data?.message);
        }
      })
    );
    setChapterDetails(chaptersTemp);
  };

  return (
    <>
      <div>
        <table id="library" className="center w-70">
          <thead>
            <tr>
              <th>Chapter</th>
              <th>Completion</th>
            </tr>
          </thead>
          <tbody>
            {chapterDetails?.map((ch, i) => (
              <tr key={i}>
                <td>
                  <Link
                    to={`/library/player/${urlParams.classroom_id}/${urlParams.subject_id}/${ch?._id}`}
                  >
                    {ch?.name}
                  </Link>
                </td>
                <td>
                  {ch.completion !== undefined ? `${ch?.completion}%` : "--"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-center">
          <Link to="/library">
            <button className="library-back-button">
              Back To Content Page
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Slibrary_Topicwise;
