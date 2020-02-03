import React, { useState } from "react";
import axios from "axios";


const Login = () => {

const [info, setInfo] = useState({});

const handleChange = e =>{
  setInfo({
    ...info,
    [e.target.name]: e.target.value
  })
}



const submitHandler = (e) => {  
  e.preventDefault();
  axios.post('http://localhost:5000/api/login', info)
  .then( res => {
    console.log('RESPONSE', res)
    localStorage.setItem("token", res.data.payload);
  })
  .catch( error => 
    console.log('ERROR', error))
}

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    
    
      <form onSubmit={submitHandler}>
    <input onChange={handleChange} type="text" name="username" placeholder="Username"/>
    <input onChange={handleChange} type="password" name="password" placeholder="Password"/>
        <button>DO IT</button>
       {console.log(info)}
      </form>
    
  );
};

export default Login;