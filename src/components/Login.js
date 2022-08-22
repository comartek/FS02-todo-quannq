import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",

    password: "",
  });
  //const [data, setData] = useState([]);

  const getData = (e) => {
    const { value, name } = e.target;

    setUser(() => {
      return {
        ...user,
        [name]: value,
      };
    });
  };

  const addData = (e) => {
    e.preventDefault();

    const { email, password } = user;

    if (email === "" || password === "") {
      alert("Chua nhap email hoac password");
    } else {
      axios
        .post("https://api-nodejs-todolist.herokuapp.com/user/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
          navigate("/todo");
        });
    }
  };

  useEffect(() => {
    const getTokenRegister = localStorage.getItem("token");
    if (getTokenRegister) {
      navigate("/todo");
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="container-login">
      <h1>Login</h1>
      <form onSubmit={addData}>
        <div className="form-control-login">
          <input
            type="text"
            id="name"
            placeholder="Username"
            onChange={getData}
          />
          <span></span>
        </div>
        <div className="form-control-login">
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={getData}
          />
          <span></span>
        </div>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
