import React from "react";
import Academic from "./Academic/Academic";
import Submission from "./Submission/Submission";
import Adddocument from "./AddDocument/Adddocument";
import { Routes, Route, NavLink } from "react-router-dom";
import "./document.css";

function Document() {
  return (
    <div>
      <div className="box">
        <div>
          <NavLink to="/document/academic"> academic</NavLink>
        </div>
        <div>
          <NavLink to="/document/submission"> Submission</NavLink>
        </div>
        <div>
          <NavLink to="/document/adddocument"> addDocument</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Document;
