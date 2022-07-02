import React, { useEffect, useState } from "react";
import Api from "../../Api/axios";
import "./show.css";
import { useDataLayerValue } from "../../DataLayer/DataLayer";
import Error from "../ErrorSuccess/Error";
const ShowCentrals = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [errMesssage, setErrMesssage] = useState();
  const [{ userDetails }, dispatch] = useDataLayerValue();

  useEffect(() => {
    fetchCentrals();
  }, []);

  const fetchCentrals = async () => {
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });
    await Api.get("/user/all-centrals")
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
  };

  return (
    <div className="show-table-container">
      <table className="table">
        <thead>
          <tr>
            <th colSpan="5">Centrals</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>User Name</td>
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

export default ShowCentrals;
