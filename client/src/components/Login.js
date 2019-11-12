import api, { setToken } from "../utilities/axios";
import axios from 'axios';
import React, { Component, useState }  from 'react';
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
    console.log(credentials)
    axios 
      .post("http://localhost:5000/api/login", credentials)
      .then(res => {
        setToken(res.data.payload)
      
        props.history.push('/bubbles')
      })
      .catch(err => setError(err));
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      {error && <div className='delete'>{`${error}`}</div>}
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
        <button>Login!</button>
      </form>
    </>
  );
};

export default Login;
