import React from "react";
import "./reportsInner.css";
import { Link } from "react-router-dom";
function ReportsInner() {
  const subjectReport = [
    {
      chapter: "1",
      data: [
        {
          attribute: "Quiz 1",
          time: "20 mins",
          score: 10,
          full_marks: 10,
        },
        {
          attribute: "Quiz 2",
          time: "17 mins",
          score: 4,
          full_marks: 10,
        },
      ],
    },
    {
      chapter: "2",
      data: [
        {
          attribute: "Quiz 1",
          time: "20 mins",
          score: 10,
          full_marks: 10,
        },
        {
          attribute: "Quiz 2",
          time: "17 mins",
          score: 4,
          full_marks: 10,
        },
      ],
    },
    {
      chapter: "3",
      data: [
        {
          attribute: "Quiz 1",
          time: "20 mins",
          score: 10,
          full_marks: 10,
        },
        {
          attribute: "Quiz 2",
          time: "17 mins",
          score: 4,
          full_marks: 10,
        },
      ],
    },
  ];

  return (
    <div className="ReportsInner">
      {subjectReport?.map((rep) => (
        <div className="reportsInner-container" key={rep.chapter}>
          <p className="reportInner-chapter">{`Chapter ${rep.chapter}`}</p>
          <div className="reportsInner-main-container">
            <table className="reportsInner-subject-table">
              <thead>
                <tr>
                  <th>Attribute</th>
                  <th>Time taken</th>
                  <th>Score</th>
                </tr>
              </thead>
              {rep?.data?.map((data) => (
                <tr key={data.attribute}>
                  <td>{data.attribute}</td>
                  <td>{data.time}</td>
                  <td>{`${data.score} / ${data.full_marks}`}</td>
                </tr>
              ))}
              <tbody></tbody>
            </table>

            <div className="reportsInner-subject-report-container">
              <select name="reports-dr-down" id="reports-dr-down">
                <option value="Choose">Choose Quiz / Assessment</option>
                <option value="quiz">Quiz</option>
                <option value="assessment">Assessment</option>
              </select>

              <button className="reportsInner-report-btn ">Go to Report</button>
              <button className="reportsInner-report-btn ">
                Get Aggregate Report
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="reportsInner-exit-btn">
        <Link to="/reports">
          <button>Back to Subject Summary</button>
        </Link>
      </div>
    </div>
  );
}

export default ReportsInner;
