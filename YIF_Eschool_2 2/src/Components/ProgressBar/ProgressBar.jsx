import React, { useEffect, useState } from "react";
import "./progressBar.css";

function ProgressBar(props) {
  const [progressWidth, setProgressWidth] = useState("");
  useEffect(() => {
    const width = `${props.progress}%`;
    setProgressWidth(width);
  }, [props.progress]);

  return (
    <div className="ProgressBar">
      <div className="progress-main" style={{ width: progressWidth }}></div>
    </div>
  );
}

export default ProgressBar;
