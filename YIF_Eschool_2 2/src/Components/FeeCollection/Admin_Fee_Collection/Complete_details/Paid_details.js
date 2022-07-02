import React from "react";

const Paid_details = ({ update }) => {
  return (
    <div>
      <table>
        <tr>
          <th>Sr.No.</th>
          <th>User Name</th>
          <th>Fee Name</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Download File</th>
        </tr>
        {update.map((e, i) => {
          return (
            <tr>
              <td>{i + 1}</td>
              <td>{e.user_name}</td>
              <td>{e.fee_name}</td>
              <td>{e.fee_amount}</td>
              <td>{e.fee_status}</td>
              <td><a href={e.short_url} target="_blank">File Here</a></td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Paid_details;
