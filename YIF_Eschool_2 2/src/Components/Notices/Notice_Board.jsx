import React, { useState, useEffect } from "react";
import "./notice_board.css";
import Api from "../../Api/axios";
import { useDataLayerValue } from "../../DataLayer/DataLayer";

function Notice_Board({ notices }) {
  const [noticeShow, setNoticeShow] = useState([]);

  return (
    <div className="notice-board-container">
      <div className="notice-board-container-main">
        <div className="notice-board-box">
          <h4>Notices</h4>
          <div className="notice-board-main">
            {
              <div className="notice-item-container">
                {notices?.map((j) => {
                  return (
                    <>
                      <h5>{j?.title}</h5>
                      <p>{j?.description}</p>
                      <span>
                        {j?.file_key !== "" && (
                          <a href={j.file} target="_blank">
                            {j?.file_key}
                          </a>
                        )}
                      </span>
                      <br />
                      <br />
                      <br />
                    </>
                  );
                })}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notice_Board;
