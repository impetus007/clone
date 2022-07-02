import React from "react";
import ProgressBar from "../../ProgressBar/ProgressBar";
import { Link } from "react-router-dom";
import { useDataLayerValue } from "../../../DataLayer/DataLayer";
import "./student_reports.css";

function Student_Reports() {
  const [{ reports_list, overAll_performance }] = useDataLayerValue();
  return (
    <div className="Student-Reports">
      <div className="student-reports-container">
        <div className="student-reports-container-main">
          <table className="student-reports-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Overall Aggregate</th>
                <th>Report Generation</th>
              </tr>
            </thead>
            <tbody>
              {reports_list?.map((rep) => (
                <tr key={rep.sub}>
                  <td>
                    <Link to="subject">{rep.sub}</Link>
                  </td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <ProgressBar progress={rep.overall_aggregate} />{" "}
                    {`${rep.overall_aggregate}%`}
                  </td>
                  <td>
                    <a href={rep.report_link}>Generate Report</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="student-reports-bottom-container">
            <div className="student-reports-bottom">
              {overAll_performance?.map((ele) => (
                <div className="report-overall-perf">
                  {ele.name}
                  <ProgressBar progress={ele.progress} />
                  {`${ele.progress}%`}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student_Reports;
