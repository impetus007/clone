import { Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    occupation: "",
    password: "",
    cpassword: "",
  });
  let name, value;
  const signupInput = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };
  const postData = async (e) => {
    e.preventDefault();

    const { name, email, phone, occupation, password, cpassword } = user;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        occupation,
        password,
        cpassword,
      }),
    });

    const data = await res.json();

    if (data.status === 422 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registraion");
    } else {
      window.alert("Registraion Successfully");
      console.log("Successfully Registraion");

      navigate("/login");
    }
  };

  return (
    <>
      <form method="POST" className="Signup">
        <h1>Sign-up</h1>
        <input
          value={user.name}
          onChange={signupInput}
          name="name"
          type="text"
          placeholder="name"
        />
        <input
          value={user.email}
          onChange={signupInput}
          name="email"
          type="email"
          placeholder="email"
        />
        <input
          value={user.phone}
          onChange={signupInput}
          name="phone"
          type="text"
          placeholder="phone"
        />
        <input
          value={user.occupation}
          onChange={signupInput}
          name="occupation"
          type="text"
          placeholder="occupation"
        />
        <input
          value={user.password}
          onChange={signupInput}
          name="password"
          type="password"
          placeholder="password"
        />
        <input
          value={user.cpassword}
          onChange={signupInput}
          name="cpassword"
          type="password"
          placeholder="confirm-password"
        />
        <Button onClick={postData} variant="contained">
          Signup
        </Button>
      </form>
    </>
  );
}

export default Signup;
