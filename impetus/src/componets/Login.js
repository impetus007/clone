import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // async function loginuser(event) {
  //   event.preventDefault();
  //   const response = await fetch("https://localhost:9000/api/login", {
  //     method: "POST",
  //     headers: {
  //       "content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email,
  //       password,
  //     }),
  //   });

  //   const data = await response.json();

  //   console.log(data);
  // }

  return (
    <div className="login">
      <div className="login_image">
        <img
          className="img"
          src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg "
        />
        <h1>
          Facebook helps you connect and share with the people in your life.
        </h1>
      </div>
      <form className="card">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email address or phone Number"
          type="text"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          type="password"
        />
        <button type="submit">Log in</button>
        <a href="www.facebook.com">forgotten Password ?</a>
        <hr />
        <center>
          <Link to="/signup">
            <button id="create_button">Create new Account</button>
          </Link>
        </center>
      </form>
    </div>
  );
}

export default Login;
