import React, { useState } from "react";
import axios from 'axios';

const Login = props => {
  
  const [userCreds, setUserCreds] = useState({ username: '', password: '' });

  const handleChange = event => {
    setUserCreds({...userCreds, [event.target.name]: event.target.value})
  }

  const handleSubmit = event => {
    event.preventDefault();
    axios.post(`http://localhost:5000/api/login`, userCreds)
      .then(res => {
        console.log(res.data)
        localStorage.setItem('token', res.data.payload)
        props.history.push('/bubble-page')

      })
      .catch(err => console.log(err))
  }
  

  
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Sign in here</p>
      <form onSubmit={handleSubmit}>
        <input type='text' 
               name='username' 
               placeholder='Username' 
               value={userCreds.username}
               onChange={handleChange}  
               />
        <input type='password' 
               name='password' 
               placeholder='password' 
               value={userCreds.password}
               onChange={handleChange}  
               />
        <button type='submit'>Sign In</button>
      </form>
    </>
  );
};

export default Login;
