import React, { useState, useEffect } from "react";
import "./ad_lib.css";
import School_Admin_Library_Chooser from "./School_Admin_Library_Chooser";
import School_Admin_Library_Content_Comp from "./School_Admin_Library_Content_Comp";
import School_Admin_Library_Lib from "./School_Admin_Library_Lib";
import Library_Toggler from "../Library_Toggler";
import { useDataLayerValue } from "../../../DataLayer/DataLayer";

function School_Admin_Library() {
  const [showProgress, setShowProgress] = useState(false);
  const [showLibContent, setShowLibContent] = useState(false);

  const restrictContentProgressVisibility = () => {
    setShowProgress(false);
  };
  const toggleLibContentVisibility = () => {
    setShowLibContent(false);
  };

  return (
    <>
      <Library_Toggler />
      <div className="ad-lib">
        <div className="ad-lib-container">
          <div className="ad-lib-container-top">
            <School_Admin_Library_Chooser />
          </div>
        </div>
      </div>
    </>
  );
}

export default School_Admin_Library;
