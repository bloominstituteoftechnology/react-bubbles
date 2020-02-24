import React, { useState } from "react";
import { axiosWithAuth } from "./axiosWithAuth";
import axios from "axios";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState({});

  const login = e => {
    e.preventDefault();
    console.log(credentials);
    axiosWithAuth().post('http://localhost:5000/api/login', credentials)
      .then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.payload);
        props.history.push('/BubblePage');
      })
  }

  const handleChange = e => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <br />
      <form onSubmit={login}>
        <input 
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <input 
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button>Log in</button>
      </form>
    </div>
  );
};

export default Login;
