import React, { useState, useEffect } from "react";
import "./liveClasses_admin.css";
import { useDataLayerValue } from "../../../DataLayer/DataLayer";
import Api from "../../../Api/axios";
import { MdDelete } from "react-icons/md";

function LiveClasses_Admin() {
  const [classList, setClassList] = useState([]);
  useEffect(() => {
    getClasses();
  }, []);

  const getClasses = async () => {
    let classListTemp = [];
    await Api.get("/live-class")
      .then((res) => {
        classListTemp = res.data;
      })
      .catch((err) => console.log(err?.response?.data?.message));

    classListTemp.sort((a, b) => {
      return a.class_name > b.class_name ? 1 : -1;
    });
    setClassList(classListTemp);
  };

  return (
    <div className="LiveClasses">
      <div className="liveClasses-container">
        <div className="liveClasses-container-main">
          <table className="class-link-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Section</th>
                <th>Time</th>
                <th>Link</th>
                <th>Delete Link</th>
              </tr>
            </thead>
            <tbody>
              {classList?.map((cl, i) => (
                <tr key={i}>
                  <td>{cl?.class_name}</td>
                  <td>{cl?.class_section}</td>
                  <td>10:00 - 16:00</td>
                  <td>
                    <a
                      href={cl?.meet_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {cl?.meet_link}
                    </a>
                  </td>
                  <td>
                    <MdDelete
                      color="red"
                      style={{ cursor: "pointer" }}
                      size={20}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LiveClasses_Admin;
