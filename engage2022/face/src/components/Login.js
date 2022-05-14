import { Button } from "@mui/material";
import React from "react";

import loginImage from "../Svg/login.svg";
import "./Login.css";

function Login() {
  return (
    <form className="Login">
      <div className="login-left">
        <img className="loginImg" src={loginImage} alt="" />
      </div>
      <div className="login-right">
        <h1>Login</h1>
        <input className="loginInput" placeholder="Enter your Username" />
        <br></br>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your Password"
        />
        <br></br>
        <Button variant="contained">login</Button>
      </div>
    </form>
  );
}

export default Login;
