import React, { useState } from "react";
import { axiosWithAuth } from './axiosWithAuth'

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [login, setLogin] = useState({ username: '', password: ''});

  const handleLogin = event => {
    setLogin({...login, [event.target.name]: event.target.value});

    console.log('handleLogin:', event.target.name, event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefualt();
    axiosWithAuth()
      .post('/api/login', login)
      .then(resp => {
        localStorage.setItem('token', resp.data.payload);
        props.history.push('/bubbles')
      })
      .catch(err => console.log(err.resp));
  };

  return (
    <div className= 'Bubble-Login'>
      <h1>Welcome to the Bubble App!</h1>
      
      <form onSubmit={handleSubmit}>
        <input 
          type= 'text'
          name= 'username'
          placeholder= 'Username'
          className= 'username'
          onChange= {handleLogin}
          value= {login.username}
        />

        <input 
          type= 'password'
          name= 'password'
          placeholder= 'Password'
          className= 'password'
          onChange= {handleLogin}
          value= {login.password}
        />

        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;
