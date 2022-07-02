import React from "react";

function Success({ message }) {
  return (
    <div style={{ color: "limegreen", margin: "10px 0", fontWeight: "Bold" }}>
      {message}
    </div>
  );
}

export default Success;
