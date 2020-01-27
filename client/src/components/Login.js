import React, { useState } from "react";
import { axiosWithAuth } from "../auth/axiosWithAuth";
import axios from 'axios';

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [data, setData] = useState({
    username: '',
    password: ''
  });

  
  const handleSubmit = (data) => {
  axios
    .post('http://localhost:5000/api/login', data)
    .then(res => {
      localStorage.setItem('token', res.data.payload);
      // props.history.push('/dashboard');
    })
    .catch(err => console.log('You must be logged in', err));

  };

  const handleChange = e => {
    e.preventDefault();
    setData({...data, [e.target.name] : e.target.value});
  };

  return (
    <>
     <form onSubmit={handleSubmit}>
       <input
          type='text'
          name='username'
          placeholder='Username'
          value={data.username}
          onChange={handleChange}
         /> 
        <input
          type='text'
          name='password'
          placeholder='Password'
          value={data.password}
          onChange={handleChange}
         /> 
         <button>Login</button>
     </form>
    </>
  );
};

export default Login;
