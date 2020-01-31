import React, { useState } from "react";
import axios from 'axios';

const Login = props => {

  const [login, setLogin] = useState({
    username: 'Lambda School',
    password: 'i<3Lambd4'
  })

  const handleChange = e => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault();
    setLogin({
      username: '',
      password: ''
    })
    axios
      .post(`http://localhost:5000/api/login`, login)
        .then(res => {
          localStorage.setItem('token', res.data.payload)
          props.history.push('/bubbles')
        })
        .catch(err => console.log(err.response))
  }

  return (
    <div className="login-container">
      <h1>Welcome to KJ's Bubble App!</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label>Username:</label>
        <input 
          type="text"
          name="username"
          placeholder="Username"
          value={login.username}
          onChange={handleChange}
        />
        <label>Password:</label>
        <input 
          type="text"
          name="password"
          placeholder="Password"
          value={login.password}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;