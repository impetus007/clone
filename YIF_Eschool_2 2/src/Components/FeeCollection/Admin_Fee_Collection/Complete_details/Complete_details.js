import React, { useState, useEffect } from "react";
import Api from "../../../../Api/axios";
import "./Complete_details.css";
import Unpaid from "./UnPaid_details";
import Paid from "./Paid_details";

const Complete_details = () => {
  const [toggle, setToggle] = useState(-1);
  const [allFee, setAllFee] = useState([]);
  const [count, setCount] = useState("");
  const [update, setUpdate] = useState([]);
  const [user_details, setUser] = useState({
    fee_name: " ",
    fee_status: " ",
  });
  useEffect(() => {
    async function fetchData() {
      const response = await Api.get("/fees/all");
      setAllFee(response.data);
    }
    fetchData();
  }, [count]);

  const handleChange = (e) => {
    setUser({ ...user_details, [e.target.id]: e.target.value });
  };

  const handleClick = async (fee_status, fee_name) => {
    {
      user_details.fee_status.toLowerCase() === "unpaid"
        ? setToggle(0)
        : user_details.fee_status.toLowerCase() === "paid"
        ? setToggle(1)
        : setToggle(-1);
    }
    await Api.get(
      `/fees/get-status?fee_status=${fee_status}&fee_name=${fee_name}`
    )
      .then((response) => {
        setUpdate(response.data);
      })
      .catch((r) => {
        // console.log(r?.response?.data?.message);
        setUpdate([]);
      });
  };
  return (
    <div>
      <div className="complete-radio">
        <select
          id="fee_status"
          name="fee_status"
          value={user_details.fee_status}
          onChange={(e) => handleChange(e)}
          required
        >
          <option selected value="">
            Status
          </option>
          <option value="unpaid">Unpaid</option>
          <option value="paid">Paid</option>
        </select>

        <select
          id="fee_name"
          name="fee_name"
          value={user_details.fee_name}
          onChange={(e) => handleChange(e)}
          required
        >
          <option selected value="">
            Select Fee Type
          </option>
          {allFee.map((i) => {
            return (
              <>
                <option key={i._id}>{i.fee_name}</option>
              </>
            );
          })}
        </select>
        <button
          className="fee-admin-button"
          onClick={() =>
            handleClick(user_details.fee_status, user_details.fee_name)
          }
        >
          Submit
        </button>
        {toggle === 0 ? (
          <Unpaid update={update} />
        ) : toggle === 1 ? (
          <Paid update={update} />
        ) : null}
      </div>
    </div>
  );
};

export default Complete_details;
