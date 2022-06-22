import React, { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  let navigate = useNavigate();
  //let history = useHistory;
  const [isLogin, setLogin] = useState("false");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault(); //prevent by default loading
    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    if (res.status === 400 || !data) {
      window.alert("Invalid Credentials");
    } else {
      window.alert("Login Successfully");
      //history.push("/");
      console.log("Login Successfully");
      setLogin("true");
      navigate("/about");
    }
  };

  return (
    <>
      <form method="POST" className="login">
        <h1>Login</h1>
        <input
          placeholder="Email"
          type="email"
          name="name"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={loginUser} variant="outlined">
          Login
        </Button>
      </form>
    </>
  );
}

export default Login;
