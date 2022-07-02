import React, { useState, useEffect } from "react";
import "./ad_lib.css";
import Inhouse_Library_Chooser from "./Inhouse_Library_Chooser";

function Inhouse_Library() {
  return (
    <>
      <div className="ad-lib">
        <div className="ad-lib-container">
          <div className="ad-lib-container-top">
            <Inhouse_Library_Chooser />
          </div>
        </div>
      </div>
    </>
  );
}

export default Inhouse_Library;
