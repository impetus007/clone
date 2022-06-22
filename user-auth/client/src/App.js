import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Contact from "./components/Contact";
import Login from "./components/Login";
import About from "./components/About";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
        </Routes>

        <Routes>
          <Route path="/about" element={<About />}></Route>
        </Routes>

        <Routes>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
        <Routes>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
        <Routes>
          <Route path="/contact" element={<Contact />}></Route>
        </Routes>
        <Routes element={<ErrorPage />}></Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
