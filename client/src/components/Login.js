import React, { useState } from 'react';
import axios from 'axios';

const initialValues = {
  username: '',
  password: '',
};

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState(initialValues);

  const handleChanges = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const submitLogin = e => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/login`, credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        props.history.push('/bubbles');
      })
      .catch(err => {
        console.log(err.response);
      });
    setCredentials(initialValues);
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={submitLogin}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={credentials.username}
          placeholder="Username"
          onChange={handleChanges}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          placeholder="Password"
          onChange={handleChanges}
        />
        <button type="submit">Log In</button>
      </form>
    </>
  );
};

export default Login;
