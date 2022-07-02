import React from "react";
import "./Assessment.css";
const tablecontext = [
  {
    name: "Science",
    topic: "Newton's Laws",
    Due_Date: "27/9/21",
    Assessment_page: "Submit",
  },
  {
    name: "Maths",
    topic: "Algebra",
    Due_Date: "27/9/21",
    Assessment_page: "Submit",
  },
  {
    name: "Social Science",
    topic: "Geography of the north",
    Due_Date: "27/9/21",
    Assessment_page: "Submit",
  },
  {
    name: "English",
    topic: "Sonnet for YOu",
    Due_Date: "27/9/21",
    Assessment_page: "Submit",
  },
];
const Assesment = () => {
  return (
    <div className="Assesment">
      <table className="Assess-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Topic</th>
            <th>Date Of Assessment</th>
            <th>Report</th>
          </tr>
        </thead>
        <tbody>
          {tablecontext.map((i) => {
            return (
              <>
                <tr>
                  <td>{i.name}</td>
                  <td>{i.topic}</td>
                  <td>{i.Due_Date}</td>
                  <td>
                    <a herf="#">{i.Assessment_page}</a>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      <button className="Assess-button">Go back to Due Assesments</button>
    </div>
  );
};

export default Assesment;
