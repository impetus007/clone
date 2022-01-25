import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./signup.css";

function Signup() {
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    date: "",
  });
  let name, value;
  const signupUser = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="signup-body">
      <form>
        <h1>Signup</h1>
        <p>It's quick and easy.</p>
        <hr />

        <input
          onChange={signupUser}
          value={user.fname}
          name="fname"
          type="text"
          placeholder="First name"
        />
        <input
          onChange={signupUser}
          value={user.lname}
          name="lname"
          type="text"
          placeholder="Surname"
        />

        <input
          onChange={signupUser}
          value={user.email}
          name="email"
          type="email"
          placeholder="email address"
        />
        <br />
        <input
          onChange={signupUser}
          value={user.password}
          name="password"
          type="password"
          placeholder="New password"
        />
        <br />
        <input
          onChange={signupUser}
          value={user.date}
          name="date"
          type="date"
          placeholder="Date of birth"
        />
        <br />
        <select>
          <option>male</option>
          <option>female</option>
        </select>
        <br />
        <br />
        <Link to="/">
          <button>signup</button>
        </Link>
      </form>
    </div>
  );
}

export default Signup;
