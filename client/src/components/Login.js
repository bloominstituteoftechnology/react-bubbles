import React,{useState} from "react";
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';


const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  //setting up the hooks
  const [credentials, setCredentials]= useState({
    username:'',
    password:''
  });
  const {push} = useHistory();

  //setting up on the onChange
  const handleChange = e =>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  const handleSubmit = e =>{
    e.preventDefault();
    //call axios baseUrl
      axiosWithAuth()
          .post('/api/login', credentials)
          .then(res =>{
            console.log('login, post', res)
            localStorage.setItem("token", res.data.payload)
            localStorage.setItem("Logged in ", true)
            push('/bubblepage');
          })
          .catch(err =>{
            console.log('Login.js: error is : ', err)
          })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
          value={credentials.username}
        />

        <input 
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          value={credentials.password}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
