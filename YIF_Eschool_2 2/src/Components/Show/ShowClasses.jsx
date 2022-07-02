import React, { useEffect, useState } from "react";
import Api from "../../Api/axios";
import "./show.css";
import { useDataLayerValue } from "../../DataLayer/DataLayer";
import Error from "../ErrorSuccess/Error";
const ShowClasses = () => {
  const [allClasses, setAllClasses] = useState([]);
  const [errMesssage, setErrMesssage] = useState();
  const [{ userDetails }, dispatch] = useDataLayerValue();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    // dispatch({
    //   type: "SET_LOADING",
    //   loading: true,
    // });
    let allTeachers = [];
    let allClassesTemp = [];
    await Api.get(`/user/by-school?id=${userDetails?.schoolId}&type=TEACHER`)
      .then((res) => {
        res.data.forEach((item) => {
          allTeachers.push(item);
        });
      })
      .catch((err) => {
        // console.log(err.response.data.message)
      });

    await Api.get("/live-class")
      .then((res) => {
        // console.log(res.data);
        res.data.forEach((item) => {
          const classTeacher = allTeachers.filter(
            (i) => item.class_teacher_id === i._id
          )[0];
          allClassesTemp.push({
            class_teacher: classTeacher?.name || null,
            class_name: item.class_name,
            class_section: item.class_section,
            subjects: item.subjects,
          });
        });
        dispatch({
          type: "SET_LOADING",
          loading: false,
        });
      })
      .catch((err) => {
        setErrMesssage(err.response.message);
        dispatch({
          type: "SET_LOADING",
          loading: false,
        });
      });
    // console.log(allClassesTemp);
    setAllClasses(allClassesTemp);
  };

  return (
    <div className="show-table-container">
      <table className="table">
        <thead>
          <tr>
            <th colSpan="5">Classes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Class</td>
            <td>Section</td>
            <td>Class Teacher</td>
            <td>Subjects</td>
          </tr>
          {allClasses?.map((class_) => (
            <tr>
              <td>{class_?.class_name}</td>
              <td>{class_?.class_section}</td>
              <td>{class_?.class_teacher}</td>
              <td>
                {class_?.subjects?.length === 0 ||
                class_?.subjects === undefined
                  ? "--"
                  : class_?.subjects?.map((sub, j) =>
                      j !== class_?.subjects?.length - 1 ? sub + " , " : sub
                    )}
              </td>
            </tr>
          ))}
          {errMesssage && <Error message={errMesssage} />}
        </tbody>
      </table>
    </div>
  );
};

export default ShowClasses;
