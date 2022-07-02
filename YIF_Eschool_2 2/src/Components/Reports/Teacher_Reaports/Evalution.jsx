import React from "react";
import "./Treports.css";
import ProgressBar from "../../ProgressBar/ProgressBar";
import { NavLink } from "react-router-dom";
const overAll_performance = [
  {
    name: "Attendance Aggregate",
    progress: 40,
  },
  {
    name: "Assessment Aggregate",
    progress: 70,
  },
  {
    name: "Quizzes Aggregate",
    progress: 60,
  },
];
const Evalution = () => {
  return (
    <div className="Evalution">
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
      <div className="div-progress">
        {overAll_performance?.map((ele) => (
          <div className="report-overall-perf">
            {ele.name}
            <ProgressBar progress={ele.progress} />
          </div>
        ))}
      </div>
      <NavLink to="/reports/Evalution/Go-Evalution">
        <button>Go To Evalutions</button>
      </NavLink>
    </div>
  );
};

export default Evalution;
