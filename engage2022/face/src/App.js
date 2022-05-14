import React from "react";
import Nav from "./components/Nav";
import Card from "./components/Card";
import Banner from "./components/Banner";
import "@material-ui/core";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <div>
      <Nav />
      <Banner />
      <Card />
      <Login />
      <Signup />
    </div>
  );
}

export default App;
