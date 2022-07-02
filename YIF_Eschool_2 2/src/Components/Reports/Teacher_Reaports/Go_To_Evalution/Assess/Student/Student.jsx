import React from "react";
import ProgressBar from "../../../../../ProgressBar/ProgressBar";
import "./Student.css";
const Student = () => {
  return (
    <div className="Student">
      <h2>
        Monthly Aggregate :
        <div className="progress">
          <ProgressBar progress={60} />
        </div>
      </h2>
      <select>
        <option>Select Class</option>
        <option>9th</option>
        <option>10th</option>
        <option>11th</option>
      </select>
      <select>
        <option>Select Subject</option>
        <option>English</option>
        <option>Maths</option>
        <option>Science</option>
      </select>
      <button> Generate Performance Report </button>
    </div>
  );
};

export default Student;
