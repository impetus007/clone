import React, { useState, useEffect } from "react";
import "../fee-collection.css";
import Api from "../../../Api/axios";
import { useDataLayerValue } from "../../../DataLayer/DataLayer";

function StudentFeeCollection() {
  const [{ userDetails }, dispatch] = useDataLayerValue();

  const [allFee, setAllFee] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await Api.get("/fees");

      setAllFee(
        response.data.sort(function (a, b) {
          if (a.fee_status < b.fee_status) {
            return -1;
          }
          if (a.fee_status > b.fee_status) {
            return 1;
          }
        })
      );
      let dummyData = [
        ...allFee,
        (allFee[allFee.length - 1].fee_status = "paid"),
      ];
      setAllFee(dummyData);
    }
    fetchData();
  }, []);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  async function displayRazorpay(item) {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const result = await Api.post("/fees/create-order", {
      fee_id: item.fee_id,
      recepit: userDetails.name + "-" + item.fee_data.fee_name,
    });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_8vW4jSYim88kLi",
      amount: amount.toString(),
      currency: currency,
      name: "Youth India Foundation",
      description: "Student Fees",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
        // console.log(data);
        const result = await Api.post("/fees/payment/success", data);
        alert(result.data.msg);
      },
      prefill: {
        name: item.name,
        email: item.email,
        contact: item.contact,
      },
      notes: {
        address: "",
      },
      theme: {
        color: "#1981ee",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  const downloadInvoice = async (feeId) => {
    await Api.post(`/fees/invoice?fee_id=${feeId}`)
      .then((res) => {
        // console.log("======invoice response=======", res.data);
      })
      .catch((err) => {
        // console.log("======invoice err=======", err);
      });
  };
  return (
    <div>
      <div>
        {/* Table */}
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow-md sm:rounded-lg">
                <table className="w-70 table-boder center">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th>Fee Due</th>
                      <th>Due Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allFee.map((item) => (
                      <tr>
                        <td>{item.fee_data.fee_name}</td>
                        <td>{item.fee_data.fee_due_date}</td>
                        <td>{item.fee_data.fee_amount}</td>
                        <td className="capitalize">{item.fee_status}</td>
                        <td>
                          {item.fee_status == "unpaid" ? (
                            <a
                              href="#"
                              onClick={() => {
                                displayRazorpay(item);
                              }}
                            >
                              Pay Now
                            </a>
                          ) : (
                            <a
                              href="#"
                              onClick={() => {
                                downloadInvoice(item.fee_id);
                              }}
                            >
                              Download Receipt
                            </a>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentFeeCollection;
