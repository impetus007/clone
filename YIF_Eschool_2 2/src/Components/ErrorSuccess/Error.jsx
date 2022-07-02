import React from "react";
// import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function Error({ message }) {
  return (
    <p
      style={{
        color: "red",
        margin: "10px 0",
        display: "flex",
        alignItems: "center",
        fontWeight: "Bold",
      }}
    >
      {/* <ErrorOutlineIcon fontSize="small" style={{ marginRight: "5px" }} />{" "} */}
      {message}
    </p>
  );
}

export default Error;
