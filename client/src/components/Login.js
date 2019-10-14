import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsername = event => {
    setUsername(event.target.value);
  };

  const handlePassword = event => {
    setPassword(event.target.value);
  };

  const login = event => {
    event.preventDefault();
    axiosWithAuth()
      .post('/login', { username: username, password: password })
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        props.history.push('/protected');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={login} className="login">
      <h1>Login</h1>
      <input
        type="text"
        onChange={handleUsername}
        placeholder="Username"
        value={username}
      />
      <input
        type="password"
        onChange={handlePassword}
        placeholder="Password"
        value={password}
      />
      <button onClick={login}>Login</button>
    </form>
  );
};

export default Login;
