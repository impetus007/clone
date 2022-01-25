import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./componets/Login";
import Signup from "./componets/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
