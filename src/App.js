import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Register from "./components/Register";
import ToDo from "./components/ToDo";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/todo" element={<ToDo />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Register />
      </Router>
    </div>
  );
}

export default App;
