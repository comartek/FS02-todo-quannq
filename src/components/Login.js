import React from "react";

const Login = () => {
  return (
    <div className="login">
      <h1>Register</h1>
      <form>
        <div className="form-control">
          <input type="text" id="username" placeholder="Enter username" />
          <span></span>
        </div>
        <div className="form-control">
          <input type="email" id="email" placeholder="Enter email" />
          <span></span>
        </div>
      </form>
    </div>
  );
};

export default Login;
