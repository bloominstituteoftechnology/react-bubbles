import React, { useState } from "react";
import { axiosAuth } from "../utils/axiosAuth";
import { useHistory } from "react-router-dom";

const Login = () => {

  const { push } = useHistory()

  // make a post request to retrieve a token from the api
  const [creds, setCreds] = useState({
    username: '',
    password: ''
  })

  // when you have handled the token, navigate to the BubblePage route
  const handleChange = e => {
    setCreds({
      ...creds,
      [e.target.name] : e.target.value
    })
    console.log('after setCreds runs', creds)
  }

  const handleLogin = e => {
    e.preventDefault()

    axiosAuth()
    .post('/api/login', creds)
    .then(res => {
      console.log('authenticated resonse', res)
      localStorage.setItem('token', res.data.payload )
      push('/bubbles')
    })
    .catch(err => console.log(err))


  }

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      
      <form onSubmit={handleLogin} >
        <input 
          type='text'
          name='username'
          value={creds.username}
          placeholder='username'
          onChange={handleChange}
        />
        <input 
          type='password'
          name='password'
          value={creds.password}
          placeholder='password'
          onChange={handleChange}
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
