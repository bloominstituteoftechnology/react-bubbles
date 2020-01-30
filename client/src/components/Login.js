import React, {useState, useEffect} from "react";
import axios from 'axios';

import axiosWithAuth from '../axiosWithAuth';

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [username, setUsername] = useState('Lambda School');
  const [password, setPassword] = useState('i<3Lambd4')

  const submit = (event) => {

    event.preventDefault();

    axiosWithAuth().post('/api/login', { username: username, password: password }).catch(err => console.log(err)).then(res => {
      console.log(res);
      localStorage.setItem('token', res.data.payload);
    });

  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form onSubmit={(event) => submit(event)}>
        <input placeholder='Username'></input>
        <input placeholder='Password'></input>
        <button>Submit</button>
      </form>
    </>
  );
};

export default Login;
