import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Api, { setToken, removeToken } from "./Api/axios";
import "./App.css";
import Body from "./Components/Body/Body";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import { useDataLayerValue } from "./DataLayer/DataLayer";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
function App() {
  const [{ loggedIn, loading, userDetails }, dispatch] = useDataLayerValue();

  // Functions for signing in and out
  useEffect(() => {
    initialLogin();
  }, []);

  useEffect(() => {
    if (userDetails?.userType === "TEACHER") {
      detectClassTeacher();
    }
  }, [userDetails]);

  // Function to login onLoad (If token is valid)
  const initialLogin = async () => {
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });
    const token = localStorage.getItem("token");
    await Api.get("/user/get-user", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        // console.log(res);
        if (res.status === 200 && res.data.status !== 403) {
          // console.log("LoggedIn");
          setToken();
          dispatch({
            type: "SET_LOGIN_STATUS",
            loggedIn: true,
          });
          dispatch({
            type: "SET_USER_DETAILS",
            userDetails: res.data,
          });
        }
      })
      .catch((err) => {
        // console.log(err)
      });
    dispatch({
      type: "SET_LOADING",
      loading: false,
    });
  };

  // Function to logout
  const logout = () => {
    localStorage.removeItem("token");
    removeToken();
    dispatch({
      type: "SET_LOGIN_STATUS",
      loggedIn: false,
    });
    dispatch({
      type: "SET_USER_DETAILS",
      userDetails: {},
    });
    dispatch({
      type: "SET_CLASS_TEACHER_CLASS_DETAILS",
      class_teacher_class_details: undefined,
    });
  };

  // Function to check if a teacher is class teacher

  const detectClassTeacher = async () => {
    await Api.get("/live-class/class-teacher")
      .then((res) => {
        if (res.data.length > 0) {
          dispatch({
            type: "SET_CLASS_TEACHER_CLASS_DETAILS",
            class_teacher_class_details: {
              class_name: res.data[0].class_name,
              class_section: res.data[0].class_section,
            },
          });
        } else {
          dispatch({
            type: "SET_CLASS_TEACHER_CLASS_DETAILS",
            class_teacher_class_details: undefined,
          });
        }
      })
      .catch((err) => {
        // console.log(err.response.data.message)
      });
  };

  return (
    <Router>
      <div className="App">
        <Header logout={logout} />
        <div className="main-container">
          <Sidebar />
          {/* sidebar */}
          <Body />
        </div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </Router>
  );
}

export default App;
