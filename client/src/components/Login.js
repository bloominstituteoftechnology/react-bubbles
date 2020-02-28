import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [ credentials, setCredentials ] = useState({
    username: '',
    password: ''
  });

  const handleChanges = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const login = e => {
    e.preventDefault();
    axiosWithAuth().post('/api/login', credentials)
      .then( res => {
        window.localStorage.setItem('token', res.data.payload);
        props.history.push('/protected');
      })
      .catch( err => console.log('login axios error', err))
  }
  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={login}>
        <input
          type="text"
          name="username"
          value={props.username}
          onChange={handleChanges}
        />
        <input
          type='password'
          name="password"
          value={props.password}
          onChange={handleChanges}
        />
        <button onClick={login}>Log in</button>
      </form>
    </div>
  );
};

export default Login;