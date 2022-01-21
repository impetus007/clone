import React from "react";
import loginImg from "../images/login_image.svg";
import "./Login.css";
function Login() {
  return (
    <div className="body">
      <div className="login_image">
        <img src={loginImg} />
      </div>
      <form className="card">
        <input placeholder="Email address or phone Number" type="text" />
        <input placeholder="Password" type="password" />
        <button type="submit">Log in</button>
        <a href="www.facebook.com">forgotten Password ?</a>
        <hr />
        <center>
          <button onClick={} id="create_button">Create new Account</button>
        </center>
      </form>
    </div>
  );
}

export default Login;
