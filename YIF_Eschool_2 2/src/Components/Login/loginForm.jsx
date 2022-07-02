import { useState } from "react";
import { useDataLayerValue } from "../../DataLayer/DataLayer";
import Error from "../ErrorSuccess/Error";

const LoginForm = ({ login, error }) => {
  const [userCred, setUserCred] = useState({ email: "", password: "" });
  const submit = (e) => {
    e.preventDefault();
    login(userCred);
  };
  return (
    <>
      <form onSubmit={submit}>
        <div className="form-inner">
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={(e) =>
                setUserCred({ ...userCred, email: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) =>
                setUserCred({ ...userCred, password: e.target.value })
              }
              required
            />
          </div>
          {error && <Error message={error} />}
          <input type="submit" value="LOGIN" />
        </div>
      </form>
    </>
  );
};

export default LoginForm;
