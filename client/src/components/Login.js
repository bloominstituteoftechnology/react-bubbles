import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const handleUsernameChange = e => {
    setUsername(e.target.value)
  }
  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }
  
  
    const handleSubmit = e => {
      e.preventDefault()
      console.log(username, password)
      axiosWithAuth()
      .post('/api/login', 
      { 
        username, 
        password 
      })
      .then(res => {
        console.log(res)
        window.localStorage.setItem('token', res.data.payload);

        props.history.push('./BubblePage');
      })
      .catch(err => console.log(err))
    }
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button>Log in</button>
      </form>
    </>
  );
};

export default Login;
