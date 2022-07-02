import React, { useState } from "react";
import { adminFeeDummyData } from "../admin-fee-collection.js";
// import { useDataLayerValue } from '../../../DataLayer/DataLayer'

function AdminFeeCollection() {
  const dummy = [
    {
      user_id: "6312",
      user_name: "Alpha",
      conventional_id: "std125",
      user_type: "Student",
      fee_name: "Yearly",
      fee_status: "Unpaid",
      class: "10",
      section: "B",
      fee_amount: "Rs. 500",
    },
    {
      user_id: "6312",
      user_name: "Alpha",
      conventional_id: "std125",
      user_type: "Student",
      fee_name: "Yearly",
      fee_status: "Paid",
      class: "10",
      section: "B",
      fee_amount: "Rs. 500",
    },
    {
      user_id: "6312",
      user_name: "Alpha",
      conventional_id: "std125",
      user_type: "Student",
      fee_name: "Quaterly",
      fee_status: "Unpaid",
      class: "10",
      section: "B",
      fee_amount: "Rs. 500",
    },
    {
      user_id: "6312",
      user_name: "Alpha",
      conventional_id: "std125",
      user_type: "Student",
      fee_name: "Quaterly",
      fee_status: "Paid",
      class: "10",
      section: "B",
      fee_amount: "Rs. 500",
    },
    {
      user_id: "6312",
      user_name: "Alpha",
      conventional_id: "std125",
      user_type: "Teacher",
      fee_name: "Event",
      fee_status: "Unpaid",
      class: "10",
      section: "B",
      fee_amount: "Rs. 500",
    },
    {
      user_id: "6312",
      user_name: "Alpha",
      conventional_id: "std125",
      user_type: "Teacher",
      fee_name: "Event",
      fee_status: "Paid",
      class: "10",
      section: "B",
      fee_amount: "Rs. 500",
    },
  ];

  const uniqueClasses = [
    ...new Set(
      dummy.map((e) => {
        return e.class;
      })
    ),
  ];
  const [feeStatus, setFeeStatus] = useState("Paid");
  const [userType, setUserType] = useState("0");
  const [feeName, setFeeName] = useState("0");

  const fee_names = ["Yearly", "Quaterly", "Event"];

  const user_types = ["Student", "Teacher"];

  // const [{class_teacher_class_details, userDetails}] = useDataLayerValue()

  const [adminFeeData, setAdminFeeData] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setAdminFeeData(
      dummy.filter((e) => {
        return (
          e.fee_status == feeStatus &&
          e.user_type == userType &&
          e.fee_name == feeName
        );
      })
    );
  };
  return (
    <div>
      <form className="center" onSubmit={(e) => handleSubmit(e)}>
        <span style={{ marginLeft: "10px" }}>Status</span>
        <div className="toggle-switch">
          <input
            type="checkbox"
            className="checkbox"
            name="status"
            id="status"
            onChange={(e) =>
              e.target.checked ? setFeeStatus("Paid") : setFeeStatus("Unpaid")
            }
          />
          <label className="label" htmlFor="status">
            <span className="inner" />
            <span className="switch" />
          </label>
        </div>
        <select
          className=""
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="0" Selected>
            Select User Type
          </option>
          {user_types.map((c) => (
            <option value={c}>{c}</option>
          ))}
        </select>
        <select
          className=" ml-10"
          value={feeName}
          onChange={(e) => setFeeName(e.target.value)}
        >
          <option value="0" Selected>
            Select Fee Name
          </option>
          {fee_names.map((c) => (
            <option value={c}>{c}</option>
          ))}
        </select>
        <button type="submit">Get Data</button>
      </form>
      {/* </div> */}
      <br />
      {/* Fee Table */}
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
            <div className="mx-auto">
              {adminFeeData && (
                <table className="w-70 table-boder center">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th>Sr. No.</th>
                      <th>User Name</th>
                      <th>Fee Amount</th>
                      <th>Links</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminFeeData.map((e, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{e.user_name}</td>
                        <td>{e.fee_amount}</td>
                        <td className="capitalize">
                          {feeStatus == "Paid" ? (
                            <a href="/">Recipt</a>
                          ) : (
                            <a href="/">Mark as Paid</a>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminFeeCollection;
