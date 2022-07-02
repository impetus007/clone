import React from "react";
import "./liveClasses_student.css";

function LiveClasses_Student() {
  return (
    <div className="LiveClasses">
      <div className="liveClasses-container">
        <div className="liveClasses-container-main">
          <table className="class-link-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Time</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LiveClasses_Student;
