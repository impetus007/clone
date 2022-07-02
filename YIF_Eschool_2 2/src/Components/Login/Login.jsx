import React, { useState, useEffect } from "react";
import LoginForm from "./loginForm";
import "./login.css";
import { useLocation, useNavigate } from "react-router";
import { useDataLayerValue } from "../../DataLayer/DataLayer";
import Api, { setToken, removeToken } from "../../Api/axios";
import { Navigate } from "react-router-dom";

function Login() {
  const [error, setError] = useState();
  const [{ loggedIn, userDetails }, dispatch] = useDataLayerValue();
  const navigate = useNavigate();
  const location = useLocation();

  const login = async (userCreds) => {
    let loginAproved = false;
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });
    removeToken();
    await Api.post("/user/login", { user: userCreds })
      .then((res) => {
        if (res.status === 201) {
          // console.log(res.data.status);
          if (res.data.status === 401) {
            setError("Invalid Password");
          } else if (res.data.status === 404) {
            setError("User not found");
          } else {
            localStorage.setItem("token", res.data?.emailToken);
            setToken();
            dispatch({
              type: "SET_LOGIN_STATUS",
              loggedIn: true,
            });
            dispatch({
              type: "SET_USER_DETAILS",
              userDetails: res.data.currentUser,
            });
            loginAproved = true;
          }

          if (loginAproved) {
            if (location.state?.from) {
              navigate(location.state.from);
            } else {
              navigate("/");
            }
          }
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => {
        setError(
          err?.response?.data?.message ||
            "Something went wrong! Please try again later"
        );
      });
    dispatch({
      type: "SET_LOADING",
      loading: false,
    });
  };

  return (
    <>
      <div className="Login">
        <div className="login-container">
          <div className="welcome">
            <h2>
              Welcome to <span>YIF Eschool</span>
            </h2>
          </div>

          <LoginForm login={login} error={error} />
        </div>
      </div>
    </>
  );
}

export default Login;
