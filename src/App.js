import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Register from "./components/Register";
import ToDo from "./components/ToDo";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todo" element={<ToDo />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;
