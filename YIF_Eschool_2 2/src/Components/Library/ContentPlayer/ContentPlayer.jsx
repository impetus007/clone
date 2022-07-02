import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./contentplayer.css";
import { FaAngleDown } from "react-icons/fa";
import { FiPlayCircle, FiPauseCircle } from "react-icons/fi";
import { useDataLayerValue } from "../../../DataLayer/DataLayer";
import ReactPlayer from "react-player";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../../../Api/axios";

function ContentPlayer() {
  const [moduleClicked, setModuleClicked] = useState(-1);
  const [modules, setModules] = useState([]);
  const [contentDetails, setContentDetails] = useState({});
  const [contentPlaying, setContentPlaying] = useState(false);
  const [completedSubtopics, setCompletedSubtopics] = useState([]);
  const [chapterCompletion, setChapterCompletion] = useState(0);

  const [enableProgressTracking, setEnableProgressTracking] = useState(false);
  const [{ userDetails, lib_type }, dispatch] = useDataLayerValue();
  const urlParams = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getDetails();
    setEnableProgressTracking(
      userDetails?.userType === "STUDENT" ||
        userDetails?.userType === "TEACHER" ||
        lib_type !== "YIE_LIBRARY"
        ? true
        : false
    );
  }, []);

  useEffect(() => {
    if (enableProgressTracking && modules.length > 0) {
      getCompletionDetails(modules);
    }
  }, [modules]);

  const getDetails = async () => {
    let modulesTemp = [];
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });
    await Api.get("/live-class/topic", {
      params: {
        classroom_id: urlParams.classroomId,
        subject_id: urlParams.subjectId,
        chapter_id: urlParams.chapterId,
      },
    })
      .then((res) => {
        modulesTemp = res.data;
      })
      .catch((err) => console.log(err));

    await Promise.all(
      modulesTemp.map(async (mod) => {
        try {
          let res = await Api.get("/live-class/sub-topic", {
            params: {
              classroom_id: urlParams.classroomId,
              subject_id: urlParams.subjectId,
              chapter_id: urlParams.chapterId,
              topic_id: mod._id,
            },
          });

          mod.files = res.data;
        } catch (err) {
          console.log(err);
        }
      })
    );

    console.log(modulesTemp);

    setModules(modulesTemp);
    dispatch({
      type: "SET_LOADING",
      loading: false,
    });
  };

  const getCompletionDetails = async (modulesTemp) => {
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });
    let completedSubTopicsTemp = [];
    let moduleIds = [];

    modulesTemp.forEach((mod) => {
      moduleIds.push(mod._id);
    });

    await Api.get("/live-class/get-progress", {
      params: { class: "Chapter", id: urlParams.chapterId },
    })
      .then((res) => {
        const done = res.data.subtopics_done;
        const total = res.data.subtopics_total;
        const percentage = (done / total) * 100;
        setChapterCompletion(parseFloat(percentage).toFixed(0));
      })
      .catch((err) => console.log(err?.response?.data?.message));

    await Promise.all(
      moduleIds.map(async (modId) => {
        try {
          let res = await Api.get("/live-class/get-completed-subtopics", {
            params: { class: "Topic", id: modId },
          });

          res?.data?.subtopics_done?.forEach((st) => {
            completedSubTopicsTemp.push(st?.subtopic_id);
          });
        } catch (err) {
          console.log(err?.response?.data?.message);
        }
      })
    );

    setCompletedSubtopics(completedSubTopicsTemp);
    dispatch({
      type: "SET_LOADING",
      loading: false,
    });
  };

  const setContentProgress = async (pdfFileId) => {
    if (!completedSubtopics.includes(contentDetails?.file?._id)) {
      dispatch({
        type: "SET_LOADING",
        loading: true,
      });
      await Api.post("/live-class/set-progress", contentDetails?.file)
        .then((res) => {
          getCompletionDetails(modules);
        })
        .catch((err) => {
          console.log(err?.response?.data?.message);
        });
      dispatch({
        type: "SET_LOADING",
        loading: false,
      });
    }
  };

  const setVideoInfo = (module, file) => {
    setContentDetails({
      module_name: module.name,
      file_name: file.name,
      videoUrl: file.data_link,
      file: file,
    });
  };
  const setPDFInfo = (module, file) => {
    setContentDetails({
      module_name: module.name,
      file_name: file.name,
      // videoUrl: file.data_link,
      file: file,
    });
  };

  return (
    <div className="content-player-container">
      <div className="content-details">
        <button className="back-btn" onClick={() => navigate(-1)}>
          Back
        </button>
        <span>
          {contentDetails?.module_name && (
            <span>
              Module : {contentDetails.module_name} | {contentDetails.file_name}
            </span>
          )}
        </span>
        {enableProgressTracking && (
          <span>Completion : {chapterCompletion}%</span>
        )}
      </div>
      <div className="content-player-main-container">
        <div className="content-player">
          <div className="content-player-screen">
            <ReactPlayer
              controls
              //   width="100%"
              height="100%"
              onPlay={() => setContentPlaying(true)}
              onPause={() => setContentPlaying(false)}
              onEnded={() => enableProgressTracking && setContentProgress()}
              url={contentDetails?.videoUrl}
            />
          </div>
          <div className="content-player-desc">
            <p className="desc-heading">Description</p>
            <p className="desc-con">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, et.
            </p>
          </div>
        </div>
        <div className="content-player-list">
          <h4 className="cp-list-heading">Chapter content</h4>
          <div className="cp-list-content">
            {modules?.map((mod, i) => (
              <>
                <div
                  className="cp-list-content-outer"
                  key={i}
                  onClick={() =>
                    moduleClicked !== i
                      ? setModuleClicked(i)
                      : setModuleClicked(-1)
                  }
                >
                  <p>{mod?.name}</p>
                  <FaAngleDown
                    style={
                      moduleClicked === i && { transform: "rotate(180deg)" }
                    }
                  />
                </div>
                <div
                  className={`cp-list-content-inner ${
                    moduleClicked === i && "cp-list-content-inner-open"
                  } `}
                >
                  {mod?.files?.map((fl, j) => (
                    <div
                      className="cp-list-content-inner-file"
                      key={j}
                      style={{ cursor: "pointer" }}
                    >
                      {enableProgressTracking && (
                        <input
                          type="checkbox"
                          checked={completedSubtopics?.includes(fl?._id)}
                          disabled={fl?.data_type === "VIDEO"}
                          onChange={(e) => {
                            if (completedSubtopics.includes(fl?._id)) {
                              setContentProgress();
                            }
                          }}
                        />
                      )}
                      {fl?.data_type === "VIDEO" ? (
                        <p
                          onClick={() => {
                            setVideoInfo(mod, fl);
                          }}
                        >
                          {fl?._id === contentDetails?.file?._id ? (
                            contentPlaying ? (
                              <FiPauseCircle />
                            ) : (
                              <FiPlayCircle />
                            )
                          ) : (
                            ""
                          )}{" "}
                          {fl?.name}
                        </p>
                      ) : (
                        <p>
                          <a
                            href={fl?.data_link}
                            target="_blank"
                            onClick={() => setPDFInfo(mod, fl)}
                          >
                            {fl?.name}
                          </a>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentPlayer;
