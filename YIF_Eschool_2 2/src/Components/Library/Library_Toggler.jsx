import React, { useState } from "react";
import { useDataLayerValue } from "../../DataLayer/DataLayer";
import "./lib_toggler.css";

function Library_Toggler() {
  const [{ lib_type }, dispatch] = useDataLayerValue();
  return (
    <div className="library-toggler">
      <button
        onClick={() => {
          dispatch({
            type: "SET_LIB_TYPE",
            lib_type: "SCHOOL_LIBRARY",
          });
        }}
        className={
          lib_type === "SCHOOL_LIBRARY" && "library-toggler-btn-clicked"
        }
      >
        School Library
      </button>
      <button
        onClick={() => {
          dispatch({
            type: "SET_LIB_TYPE",
            lib_type: "YIE_LIBRARY",
          });
        }}
        className={lib_type === "YIE_LIBRARY" && "library-toggler-btn-clicked"}
      >
        YIE Library
      </button>
    </div>
  );
}

export default Library_Toggler;
