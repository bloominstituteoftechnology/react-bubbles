import React, { useState } from "react";
import axios from 'axios';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  
  // username: 'Lambda School', password: 'i<3Lambd4'
  const [login, setLogin] = useState({ username: '', password: '' });

  const handleChange = event => {
    setLogin({...login, [event.target.name]: event.target.value})
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios
    .post('http://localhost:5000/api/login', login)
    .then(response => {
      console.log(console.log('login response', response.data));
      localStorage.setItem('token', response.data.payload);
      props.history.push('/bubble-page')
    })
    .catch(error => {console.log('Login Error', error)
    })
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input 
        type='text'
        name='username'
        placeholder='Username'
        value={login.username}
        onChange={handleChange}
        />
        <input 
        type='password'
        name='password'
        placeholder='Password'
        value={login.password}
        onChange={handleChange}
        />
        <button type='submit'>Sign In</button>
      </form>
    </>
  );
};

export default Login;
