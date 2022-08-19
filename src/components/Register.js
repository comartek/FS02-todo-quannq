import React, { useState, useEffect } from "react";

import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/login");
    }
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    let results = await axios
      .post("https://api-nodejs-todolist.herokuapp.com/user/register", {
        name: username,
        email: email,
        password: password,
        age: age,
      })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });

    localStorage.setItem("user-info", JSON.stringify(results));
    navigate("/");
  }

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <span></span>
        </div>
        <div className="form-control">
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <span></span>
        </div>
        <div className="form-control">
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span></span>
        </div>
        <div className="form-control">
          <input
            type="number"
            id="age"
            placeholder="Enter age"
            onChange={(e) => setAge(e.target.value)}
          />
          <span></span>
        </div>
        <input type="submit" value="Register" />
        <div className="signup_route">Not a new member?</div>
      </form>
    </div>
  );
};

export default Register;
