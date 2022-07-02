import React from "react";
import "./admin_dashboard.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function Admin_Dashboard() {
  return (
    <div className="Admin_Dashboard">
      <div className="ad-db-left-container">
        <div className="ad-db-left-top">
          <div className="ad-db-attendace-container">
            <div className="ad-db-attendance-left">
              <div>
                <p>Admin</p>
                <span>50%</span>
              </div>
              <div>
                <p>Teachers</p>
                <span>50%</span>
              </div>
              <div>
                <p>Aggregate</p>
                <span>50%</span>
              </div>
            </div>
            <div className="ad-db-attendance-right">
              <div className="ad-db-attendance-tab-container">
                <table>
                  <thead>
                    <tr>
                      <th>Class</th> <th>Attendance</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>6</td>
                      <td>40%</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>40%</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>40%</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>40%</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>40%</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>40%</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>40%</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>40%</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>40%</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>40%</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>40%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="db-admin-attendance-aggr">
                <p>Aggregate</p>
                <span>50%</span>
              </div>
            </div>
          </div>
          <div className="ad-db-profile-container">
            <div className="ad-db-profile">
              <a href="">User Profile</a>
              <a href="">Classes</a>
              <a href="">Delegations</a>
              <p>Name</p>
              <p>School</p>
              <p>Admin ID</p>
            </div>

            <div className="ad-db-events">
              <table>
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Link</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Event 1</td>
                    <td>
                      <a href="">Link</a>
                    </td>
                  </tr>
                  <tr>
                    <td>Event 2</td>
                    <td>
                      <a href="">Link</a>
                    </td>
                  </tr>
                  <tr>
                    <td>Event 3</td>
                    <td>
                      <a href="">Link</a>
                    </td>
                  </tr>
                  <tr>
                    <td>Event 3</td>
                    <td>
                      <a href="">Link</a>
                    </td>
                  </tr>
                  <tr>
                    <td>Event 3</td>
                    <td>
                      <a href="">Link</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="ad-db-live-classes">
              <button>Live Classes</button>
            </div>
          </div>
        </div>
        <div className="ad-db-left-bottom">
          <div className="ad-db-assessment">
            <button>Go To Assessment</button>
            <div className="ad-db-assessment-rep">
              <div>
                <p>Completion= </p>
                <span>30%</span>
              </div>
              <div>
                <p>Monthly Aggregate= </p>
                <span>30%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ad-db-right-container">
        <div className="ad-db-calendar">
          <Calendar />
        </div>
        <div className="ad-db-notice">
          <div className="ad-db-notice-container">
            <p className="ad-db-notice-heading">Notices</p>

            <div className="ad-db-notices">
              <p>Lorem ipsum dolor sit amet.</p>
              <p>Debitis dolorem doloremque fuga ea?</p>
              <p>Deserunt commodi libero excepturi cum.</p>
              <p>Accusamus debitis veritatis placeat beatae.</p>
              <p>Animi enim fuga aliquid quis.</p>
              <p>Animi enim fuga aliquid quis.</p>
              <p>Animi enim fuga aliquid quis.</p>
              <p>Animi enim fuga aliquid quis.</p>
              <p>Animi enim fuga aliquid quis.</p>
              <p>Animi enim fuga aliquid quis.</p>
              <p>Animi enim fuga aliquid quis.</p>
              <p>Animi enim fuga aliquid quis.</p>
              <p>Animi enim fuga aliquid quis.</p>
              <p>Animi enim fuga aliquid quis.</p>
              <p>Animi enim fuga aliquid quis.</p>
              <p>Animi enim fuga aliquid quis.</p>
              <p>Animi enim fuga aliquid quis.</p>
              <p>Animi enim fuga aliquid quis.</p>
              <p>Animi enim fuga aliquid quis.</p>
              <p>Animi enim fuga aliquid quis.</p>
              <p>Animi enim fuga aliquid quis.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin_Dashboard;
