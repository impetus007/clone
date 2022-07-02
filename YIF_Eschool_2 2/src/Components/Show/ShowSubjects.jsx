import React, { useEffect, useState } from "react";
import Error from "../ErrorSuccess/Error";
import Api from "../../Api/axios";
import "./show.css";

function ShowSubjects() {
  const [classAndSubjects, setClassAndSubjects] = useState([]);
  const [errMessage, setErrMessage] = useState();
  useEffect(() => {
    getClassDetails();
  }, []);

  const getClassDetails = async () => {
    let classes = [];
    await Api.get("/live-class")
      .then((res) => {
        classes = res.data;
        setErrMessage();
      })
      .catch((err) =>
        setErrMessage("Something went wrong! please try again later")
      );
    setClassAndSubjects(classes);
  };

  return (
    <>
      <div className="show-table-container">
        <table className="table">
          <thead>
            <tr>
              <th colSpan="5">Subjects</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Class</td>
              <td>Section</td>
              <td>Subjects</td>
            </tr>
            {classAndSubjects?.map((class_, i) => (
              <tr key={i}>
                <td>{class_?.class_name}</td>
                <td>{class_?.class_section}</td>
                <td>
                  {class_?.subjects?.length !== 0
                    ? class_?.subjects?.map((sub, j) =>
                        j !== class_?.subjects?.length - 1 ? sub + " , " : sub
                      )
                    : "--"}
                </td>
              </tr>
            ))}
            {errMessage && <Error message={errMessage} />}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ShowSubjects;
