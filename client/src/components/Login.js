import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = props => {
  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const handleChange = event => {
    const { value, name } = event.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axiosWithAuth()
      .post("login", user)
      .then(response => {
        localStorage.setItem("token", response.data.payload);
        props.history.push("/bubble-page");
      })
      .catch(error => console.log("Failed Login", error));
  };

  return (
    <div>
      <h1 className="header">Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
