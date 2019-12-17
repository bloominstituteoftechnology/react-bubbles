import React from "react";
import axiosWithAuth from "../utils/axiosWithAuth.js";

const Login = props => {
  const credentials = { username: "Lambda School", password: "i<3Lambd4" };

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
    .post("login", credentials)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubbles");
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  };

  return (
    <div className="login">
      <h1>Welcome to the Bubble App!</h1>
      <p>Please enter your account information below!</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" placeholder="Lambda School" />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" placeholder="i<3Lambd4" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;