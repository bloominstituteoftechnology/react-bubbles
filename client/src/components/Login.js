import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const login = e => {
    e.preventDefault();

    axiosWithAuth()
      .post('/api/login', credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        props.history.push('/protected');
        console.log('Login.js aWA .post res', res);
      })
      .catch(err => {
        alert(err.response.data.error);
        console.log('Login.js post err: ', err.response);
      });
  };

  return (
    <div className='login-container'>
      <h1>Login</h1>
      <form onSubmit={login}>
        <input type='text' name='username' onChange={handleChange} />
        <input type='password' name='password' onChange={handleChange} />
        <button type='submit'>Log in</button>
      </form>
    </div>
  );
};

export default Login;
