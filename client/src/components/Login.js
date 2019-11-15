import React, { useState } from "react";
import axios from 'axios';

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [user, setUser] = useState ('');
  const [password, setPassword] = useState ('');

const useHandler = e => {
    e.preventDefault();
    setUser(e.target.value)
};

const passwordHandler = e => {
    e.preventDefault();
setPassword(e.target.value)
};

const handleSubmit = e => {
    e.preventDefault();
  let credentials = {
    username: user,
    password: password
}

axios
.post('http://localhost:5000/api/login', credentials)
.then(res => {localStorage.setItem ('token', res.data.payload)
})
.catch(err => console.log('error', err.response
))
    setUser('');
    setPassword('')
}	  
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={user} onChange={useHandler} placeholder="username" />
        <input type="password" value={password} onChange={passwordHandler} placeholder="password" />
        <button>Login</button>
    </form>
    </>
  );
};

export default Login;
