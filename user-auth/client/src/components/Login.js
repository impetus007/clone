import { Button } from "@mui/material";
import React from "react";
import "./login.css";

function Login() {
  return (
    <>
      <form className="login">
        <h1>Login</h1>
        <input placeholder="Email" type="email" />
        <input placeholder="password" type="password" />
        <Button variant="outlined">Login</Button>
      </form>
    </>
  );
}

export default Login;
