import React, { useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = props => {

  


  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });


  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  // const login = e => {
  //   e.preventDefault();
  //       axios
  //     .post('http://localhost:5000/api/colors', credentials)
  //     .then(res => {
  //       localStorage.setItem('token', res.data.payload);
  //       push('/BubblePage');
  //     })
  //     .catch(err => {
  //         console.error(err.message, err.response)
  //     });
  // };

  const login = e => {
    e.preventDefault();
    axiosWithAuth()
        .post('http://localhost:5000/api/login', credentials)
        .then(res => {
            localStorage.setItem('token', res.data.payload)
            props.history.push('/BubblePage')
        })
        .catch(err => {
            console.error('There was an error', err)
        })
}


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={login}>
          <input
            type='text'
            placeholder='Username'
            name='username'
            onChange={handleChange}
            value={credentials.username}
          />
  
          <input
            type='password'
            placeholder='Password'
            name='password'
            onChange={handleChange}
            value={credentials.password}
          />
      

        <div className='loginButton'>
          <button disabled={!credentials}>Log In</button>
        </div>
      </form>
    </>
  );
};

export default Login;