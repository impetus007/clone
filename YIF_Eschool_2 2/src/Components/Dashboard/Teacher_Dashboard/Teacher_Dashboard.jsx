import React from "react";
import ProgressBar from "../../ProgressBar/ProgressBar";
import "./teacher_dashboard.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function Teacher_Dashboard() {
  return (
    <div className="Teacher_Dashboard">
      <div className="teacher-db-left-container">
        <div className="teacher-db-left">
          <div className="teacher-db-assessment">
            <p>50% Uploaded Assessments</p>
            <ProgressBar progress={50} />
            <button>Go To Assessments</button>
          </div>
          <div className="teacher-db-profile-container">
            <div className="teacher-db-profile">
              <a href="">User Profile</a>
              <a href="">My Classes</a>
              <a href="">Classes</a>
              <a href="">Delegations</a>
              <p>Name</p>
              <p>School</p>
              <p>Admin ID</p>
            </div>
          </div>
          <div className="teacher-db-classes-container">
            <div className="teacher-db-classes">
              <h4>Live Classes</h4>
              <p>Connect Now</p>
              <button>Join Live Class</button>
            </div>
          </div>
        </div>

        <div className="teacher-db-right">
          <div className="teacher-db-calendar">
            <Calendar />
          </div>
          <div className="teacher-db-events">
            <div className="teacher-db-event">
              <p>Red -</p>
              <p>Live Sessions</p>
            </div>
            <div className="teacher-db-event">
              <p>Blue -</p>
              <p>Quiz</p>
            </div>
          </div>

          <div className="teacher-db-attendance-container">
            <div className="teacher-db-attendance">
              <p>Attendance</p>
              <button>Take/Update Attendance</button>
              <button>View Previous Attendance</button>
            </div>
          </div>
        </div>
      </div>

      <div className="teacher-db-right-container">
        <div className="teacher-db-content-container">
          <div className="teacher-db-content">
            <p className="teacher-db-content-head">Course Completed</p>
            <div className="teacher-db-content-progress">
              <p>Courses Completion</p>
              <p>50%</p>
              <ProgressBar progress={50} />
              <a href="">Library</a>
            </div>
          </div>
        </div>

        <div className="teacher-db-notice-container">
          <div className="teacher-db-notice">
            <p className="teacher-db-notice-head">Notices</p>
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

export default Teacher_Dashboard;
