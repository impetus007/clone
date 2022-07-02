import React, { useState, useEffect } from "react";
import "./New-content.css";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { AiOutlineFilePdf } from "react-icons/ai";
// import S3FileUpload from "react-s3";

var file;

const config = {
  bucketName: "eschoolbucket",
  // dirName: 'photos', /* optional */
  region: "ap-south-1",
  accessKeyId: "AKIAWQ7CNPPZJ5ZVI4B6",
  secretAccessKey: "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",
};

const New_content = () => {
  const [newFile, setNewFile] = useState({
    file: "",
    fileUrl: "",
    fileName: "",
  });

  const fileSelectFunc = (e) => {
    const newFileTemp = e.target.files[0];
    file = newFileTemp;
    setNewFile({
      file: newFileTemp,
      fileUrl: URL.createObjectURL(newFileTemp),
      fileName: newFileTemp.name,
    });
  };

  const submitFile = () => {
    // Storage.put(newFile.fileName, newFile.file)
    //   .then((res) => {
    //     console.log("data uploaded succesfully");
    //     console.log(res);
    //   })
    //   .catch((err) => console.log(err.response));

    // S3FileUpload.uploadFile(file, config)
    //   .then((data) => console.log(data))
    //   .catch((err) => console.error(err));
  };

  useEffect(() => {
    // console.log(newFile);
  }, [newFile]);

  return (
    <>
      <h3>Upload New Content</h3>
      <div className="New-content">
        <div className="New-div">
          <select className="New-Uploaded-select">
            <option>Select Class</option>
            <option>10-th</option>
            <option>11-th</option>
            <option>12-th</option>
          </select>
          <select className="New-Uploaded-select">
            <option>Select Subject</option>
            <option>English</option>
            <option>Maths</option>
            <option>Science</option>
          </select>
          <select className="New-Uploaded-select">
            <option>Select Subject</option>
            <option>English</option>
            <option>Maths</option>
            <option>Science</option>
          </select>
        </div>
        <div className="New-Uploaded">
          <h3>
            Date of Publishing : <input type="date" value=" " />
          </h3>
          <BsFillCalendarDateFill size={40} />
        </div>
        <div className="New-Uploaded">
          <h3>
            Tutorial PDF :{" "}
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => fileSelectFunc(e)}
            />
          </h3>
          <AiOutlineFilePdf size={40} />
        </div>
        <div className="New-checkbox">
          <pre>
            <input type="checkbox" /> Notify Class ?
          </pre>
        </div>
        <button onClick={() => submitFile()}>Upload</button>
      </div>
    </>
  );
};

export default New_content;
