import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Register from "./pages/Register";
import ToDo from "./pages/ToDo";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";

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
