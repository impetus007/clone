import React from "react";
import { Button } from "@mui/material";
import signupImage from "../Svg/login.svg";

function Signup() {
  return (
    <form className="Login">
      <div className="login-left">
        <img className="loginImg" src={signupImage} alt="" />
      </div>
      <div className="login-right">
        <h1>Signup</h1>
        <input className="loginInput" placeholder="Enter your full Name" />
        <br></br>
        <input className="loginInput" placeholder="Enter your LastName" />
        <br></br>
        <input className="loginInput" placeholder="Enter your PhoneNo" />
        <br></br>
        <input className="loginInput" placeholder="Enter your occupation" />
        <br></br>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your Password"
        />
        <br></br>
        <Button variant="contained">Signup</Button>
      </div>
    </form>
  );
}

export default Signup;
