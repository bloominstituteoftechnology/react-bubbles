import React from "react";
import {useState} from 'react'
import {axiosWithAuth} from '../utils/axiosWithAuth'
import { useHistory } from "react-router-dom";
import axios from 'axios'
const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const history = useHistory()
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const handleChange = e=>{
    e.preventDefault()
    setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
    })
  }

  const login = e=>{
    e.preventDefault()
    axios
    .post('http://localhost:5000/api/login', credentials)
    .then(res=>{
      console.log(res, 'retrieved the token')
      localStorage.setItem('token', res.data.payload)
      history.push('/protected')
    })
    .catch(res=>{
      console.log(res)
    })
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={login}>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
          <button>Log in</button>
        </form>
    </>
  );
};

export default Login;
