import React from "react";
import ProgressBar from "../../ProgressBar/ProgressBar";
import "./student_dashboard.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function Student_Dashboard() {
  return (
    <div className="Student_Dashboard">
      <div className="student-db-left-container">
        <div className="student-db-left">
          <div className="student-db-assessment">
            <p>50% Uploaded Assessments</p>
            <ProgressBar progress={50} />
            <button>Go To Assessments</button>
          </div>
          <div className="student-db-profile-container">
            <div className="student-db-profile">
              <a href="">User Profile</a>
              <a href="">My Classes</a>
              <a href="">Classes</a>
              <a href="">Delegations</a>
              <p>Name</p>
              <p>School</p>
              <p>Admin ID</p>
            </div>
          </div>
          <div className="student-db-classes-container">
            <div className="student-db-classes">
              <h4>Live Classes</h4>
              <p>Connect Now</p>
              <button>Join Live Class</button>
            </div>
          </div>
        </div>

        <div className="student-db-right">
          <div className="student-db-calendar">
            <Calendar />
          </div>
          <div className="student-db-events">
            <div className="student-db-event">
              <p>Red -</p>
              <p>Live Sessions</p>
            </div>
            <div className="student-db-event">
              <p>Blue -</p>
              <p>Quiz</p>
            </div>
          </div>

          <div className="student-db-attendance-container">
            <div className="student-db-attendance">
              <p>Attendance</p>
              <button>View Previous Attendance</button>
            </div>
          </div>
        </div>
      </div>

      <div className="student-db-right-container">
        <div className="student-db-content-container">
          <div className="student-db-content">
            <p className="student-db-content-head">Content Completed</p>
            <div className="student-db-content-progress">
              <p>Courses Completion</p>
              <p>50%</p>
              <ProgressBar progress={50} />
              <a href="">View Content Completed</a>
            </div>
          </div>
        </div>

        <div className="student-db-notice-container">
          <div className="student-db-notice">
            <p className="student-db-notice-head">Notices</p>
            <p>Lorem ipsum dolor sit amet.</p>
            <p>Tempore perspiciatis voluptates aliquam neque.</p>
            <p>Ducimus consectetur minus recusandae excepturi!</p>
            <p>Quod nisi deserunt pariatur delectus?</p>
            <p>Qui temporibus culpa repellendus saepe.</p>
            <p>Qui temporibus culpa repellendus saepe.</p>
            <p>Qui temporibus culpa repellendus saepe.</p>
            <p>Qui temporibus culpa repellendus saepe.</p>
            <p>Qui temporibus culpa repellendus saepe.</p>
            <p>Qui temporibus culpa repellendus saepe.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student_Dashboard;
