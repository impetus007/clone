import React from "react";

const loadScript = (src) => {
  return new Promise((resovle) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resovle(true);
    };
    script.onerror = () => {
      resovle(false);
    };
    document.body.appendChild(script);
  });
};
const displayRazorpay = async (amount, name, fee_name) => {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    alert("Payment Failed");
    return;
  }

  const options = {
    key: "rzp_test_AMRzXM38BzQn1y", // Enter the Key ID generated from the Dashboard
    amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: name,
    description: fee_name,
    //image: { logo },

    handler: function (response) {
      alert(response.razorpay_payment_id);
      alert("successfully done");
    },
    prefill: {
      name: "Gaurav Kumar",
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

const UnPaid_details = ({ update }) => {
  return (
    <div>
      <table>
        <tr>
          <th>Sr.No.</th>
          <th>User Name</th>
          <th>Fee Name</th>
          <th>Amount</th>
          <th>Pay Fee</th>
        </tr>
        {update.map((e, i) => {
          return (
            <tr>
              <td>{i + 1}</td>
              <td>{e.user_name}</td>
              <td>{e.fee_name}</td>
              <td>{e.fee_amount}</td>
              <td>
                <button
                  className="fee-admin-button"
                  onClick={() =>
                    displayRazorpay(e.fee_amount, e.user_name, e.fee_name)
                  }
                >
                  Pay Here
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default UnPaid_details;
