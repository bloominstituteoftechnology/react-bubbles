import React, { useState } from "react";
import axiosWithAuth from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';

const Login = () => {

  const initialState = [
    {
      username: '',
      password: ''
    }
  ]

  const [credentials, setCredentials] = useState(initialState);
  const { push } = useHistory();

  const login = e => {

    e.preventDefault()
    axiosWithAuth()
      .post('/login', credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        push('/bubbles-page')
      })
      .catch(err => console.error(err.message, err.response))
  }

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={login}>
        <input
         type="text"
          name="username" 
          placeholder="Username" 
          onChange={handleChange} 
          value={credentials.username} 
        />

        <input
          type="password" 
          name="password" 
          placeholder="Password"
          onChange={handleChange}
          value={credentials.password}
          />
        <button>Log In</button>
      </form>
    </>
  )
}

export default Login