import React, { useEffect, useState } from "react";
import Api from "../../Api/axios";
import "./show.css";
import { useDataLayerValue } from "../../DataLayer/DataLayer";
import Error from "../ErrorSuccess/Error";
const ShowSchoolAdmins = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [{ userDetails }, dispatch] = useDataLayerValue();
  const [errMesssage, setErrMesssage] = useState();

  useEffect(() => {
    fetchSchoolAdmins();
  }, []);

  const fetchSchoolAdmins = async () => {
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });

    if (
      userDetails?.userType === "CENTRAL" ||
      userDetails?.userType === "DISTRICT"
    ) {
      await Api.get("/user/all-school-admins")
        .then((res) => {
          setAllUsers(res.data);
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
    } else {
      await Api.get(
        `/user/by-school?id=${userDetails.schoolId}&type=SCHOOL_ADMIN`
      )
        .then((res) => {
          setAllUsers(res.data);

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
    }
  };
  return (
    <div className="show-table-container">
      <table className="table">
        <thead>
          <tr>
            <th colSpan="5">School Admins</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Username</td>
            <td>Contact Number</td>
          </tr>
          {allUsers?.map((user) => (
            <tr>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
              <td>{user?.username}</td>
              <td>{user?.contactNumber}</td>
            </tr>
          ))}
          {errMesssage && <Error message={errMesssage} />}
        </tbody>
      </table>
    </div>
  );
};

export default ShowSchoolAdmins;
