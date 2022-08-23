import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  // const [user, setUser] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   age: "",
  // });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  const addData = async (e) => {
    e.preventDefault();

    //const { name, email, password, age } = user;
    if (
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      age.length === 0
    ) {
      alert("Vui long nhap day du thong tin ben duoi");
    } else {
      axios
        .post("https://api-nodejs-todolist.herokuapp.com/user/register", {
          name: name,
          email: email,
          password: password,
          age: age,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          navigate("/login");
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user_login", res.data.data);
        });
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={(e) => addData(e)}>
        <div className="form-control">
          <input
            type="text"
            id="name"
            placeholder="Username"
            onChange={(e) => setName(e.target.value)}
          />
          <span></span>
        </div>
        <div className="form-control">
          <input
            type="email"
            id="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <span></span>
        </div>
        <div className="form-control">
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span></span>
        </div>
        <div className="form-control">
          <input
            type="number"
            id="age"
            placeholder="Age"
            onChange={(e) => setAge(e.target.value)}
          />
          <span></span>
        </div>

        <input type="submit" value="Register" />
        <div className="signup">
          Not a new member?
          <button>
            <NavLink to="/login">
              <p>Sign up</p>
            </NavLink>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
