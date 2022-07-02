import React, { useState, useEffect } from "react";
import Api from "../../../../Api/axios";
import Error from "../../../ErrorSuccess/Error";
import Success from "../../../ErrorSuccess/Success";
import { useNavigate } from "react-router";

const Add_details = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({});
  const [errMessage, setErrMessage] = useState();
  const [succMessage, setSuccMessage] = useState();
  useEffect(() => {
    const d = new Date().toISOString();
  }, []);

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.id]: e.target.value });
    // console.log(info);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    await Api.post("/fees", info)
      .then((res) => {
        setSuccMessage("Fees Added Successfully");
        setErrMessage();
      })
      .catch((err) => {
        setSuccMessage();
        setErrMessage(err?.response?.data?.message);
        //console.log(err?.response?.data?.message);
      });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleClick(e);
        }}
      >
        <div>
          <label>Enter Amount : </label>
          <input
            type="text"
            name="fee_amount"
            id="fee_amount"
            value={info.amount}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>

        <div>
          <label>Enter fee-Type : </label>
          <select
            id="fee_type"
            name="fee_type"
            value={info.type}
            onChange={(e) => handleChange(e)}
            required
          >
            <option>---select---</option>
            <option>STUDENT</option>
            <option>TEACHER</option>
          </select>
        </div>

        <div>
          <label>Enter Due-date : </label>
          <input
            type="date"
            id="fee_due_date"
            name="fee_due_date"
            value={info.D_date}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>

        <div>
          <label>Enter Fee-name : </label>
          <input
            type="text"
            id="fee_name"
            name="fee_name"
            value={info.name}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>

        <div>
          <label>Enter description : </label>
          <input
            type="text"
            id="fee_description"
            name="fee_description"
            value={info.description}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        {succMessage ? (
          <Success message={succMessage} />
        ) : errMessage ? (
          <Error message={errMessage} />
        ) : (
          ""
        )}
        <button className="fee-admin-button" type="submit">
          Submit
        </button>
        <button
          className="fee-admin-button"
          onClick={() => navigate("/fee-collection")}
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default Add_details;
