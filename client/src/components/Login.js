import React, { useState, useEffect } from "react";
import api, { setToken } from "../utilities/axios";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  
  const defaultCredentials = {
    username: "",
    password: ""
  }

  const [credentials, setCredentials] = useState(defaultCredentials);

  const [error, setError] = useState();

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    api()
      .post("/login", credentials)
      .then(res => {
        setToken(res.data.payload)
        setCredentials(defaultCredentials)
        props.history.push('/')
      })
      .catch(err => setError(err));
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Login!</button>
      </form>
    </>
  );
};

export default Login;
