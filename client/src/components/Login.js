import React,{useState} from "react";
import {useHistory} from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';
import './Login.css';

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
    <div className="loginDiv">
      <form className="formDiv" onSubmit={handleSubmit}>
      <h1 style={{color:"white"}}>Login</h1>
        <input style={{height:"30px", width: "250px", textAlign:"center",marginBottom:"20px"}}
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
          value={credentials.username}
        />

        <input style={{height:"30px", width: "250px", textAlign:"center", marginBottom:"20px"}}
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          value={credentials.password}
        />
        <button style={{height:"30px", width: "150px", textAlign:"center"}} type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
