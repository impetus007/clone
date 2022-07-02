import React from "react";
import ProgressBar from "../../../../../ProgressBar/ProgressBar";
import "./Admin_over.css";
const overContext = [
  {
    chapter: "matter",
    strength: 60,
    error: "5%",
    hurdle: "InterMolecular Strength",
  },
  {
    chapter: "maths",
    strength: 50,
    error: "2%",
    hurdle: "InterMolecular Strength",
  },
  {
    chapter: "matter",
    strength: 30,
    error: "5%",
    hurdle: "InterMolecular Strength",
  },
  {
    chapter: "matter",
    strength: 50,
    error: "15%",
    hurdle: "InterMolecular Strength",
  },
];
const Admin_overAll = () => {
  return (
    <div className="Admin-over">
      <h2>
        Monthly Aggregate :
        <div className="progress">
          <ProgressBar progress={60} />
        </div>
      </h2>
      <h2>
        Assessment Completetion :
        <div className="progress">
          <ProgressBar progress={60} />
        </div>
      </h2>
      <center>
        <table className="Admin-over-table">
          <thead>
            <tr>
              <th>Chapater</th>
              <th>Strength</th>
              <th>Error Frequency</th>
              <th>Hurdle Topics</th>
            </tr>
          </thead>
          <tbody>
            {overContext.map((i) => {
              return (
                <tr>
                  <td>{i.chapter}</td>
                  <td>
                    <ProgressBar progress={i.strength} />
                  </td>
                  <td>{i.error}</td>
                  <td>{i.hurdle}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </center>
    </div>
  );
};

export default Admin_overAll;
