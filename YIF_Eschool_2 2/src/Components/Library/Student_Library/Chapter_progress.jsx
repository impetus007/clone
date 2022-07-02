import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import "./chapter_progress.css";
function Chapter_progress(chapterDetails) {
  const [moduleOpen, setModuleOpen] = useState(-1);

  return (
    <div className="lib-chapter-progress">
      <h3>Chapter Progress</h3>
      <h3>
        {chapterDetails?.chapterDetails?.name} (Completion :{" "}
        {chapterDetails?.chapterDetails?.completion})
      </h3>
      <div className="chapter-progress-container">
        {chapterDetails?.chapterDetails?.modules?.map((mod, i) => (
          <div className="lib-module-container">
            <div
              className="lib-modules-outer"
              onClick={() =>
                moduleOpen === i ? setModuleOpen(-1) : setModuleOpen(i)
              }
            >
              {mod.name}{" "}
              <FaAngleDown
                style={moduleOpen === i && { transform: "rotate(180deg)" }}
              />
            </div>
            <div
              className={`lib-modules-inner ${
                i === moduleOpen && "lib-modules-inner-open"
              }`}
            >
              <ul>
                {mod?.files?.map((fl, i) => (
                  <li key={i}>
                    <a href={fl.file} target="_blank" rel="noopener noreferrer">
                      {fl.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chapter_progress;
