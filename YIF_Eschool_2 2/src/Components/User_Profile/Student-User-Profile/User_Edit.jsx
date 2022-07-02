import React from "react";

const User_Edit = () => {
  return (
    <div className="User-Edit">
      <div className="User-Edit-Container">
        <table>
          <tr>
            <td>Name</td>
            <td>Loream</td>
          </tr>
          <tr>
            <td>Age</td>
            <td>23</td>
          </tr>
          <tr>
            <td>Classes</td>
            <td>7</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>
              <a href="#">change</a>
            </td>
          </tr>
          <tr>
            <td>Student-ID</td>
            <td>Loream</td>
          </tr>
          <tr>
            <td>Parent Name</td>
            <td>XYZ</td>
          </tr>
          <tr>
            <td>School_id</td>
            <td>Loream</td>
          </tr>
          <tr>
            <td>Contact Number</td>
            <td>
              <a href="#">change</a>
            </td>
          </tr>
        </table>
        <button>Save Changes</button>
      </div>
    </div>
  );
};

export default User_Edit;
