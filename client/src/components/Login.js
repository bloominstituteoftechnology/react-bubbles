import React, { useState } from "react";
import axios from "axios";


const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [ credentials, setCredentials ] = useState({ username: "Lambda School", password: "i<3Lambd4" })
  const handleOnChange = ({ target: { name, value } }) => {
    setCredentials({...credentials, [name]: value })
  }
  const handleOnSubmit = e => {
    e.preventDefault();
    axios
    .post('http://localhost:5000/api/login', credentials)
    .then(res => {
      localStorage.setItem("token", res.data.payload)
      props.history.push("/bubblePage")
    })
    .catch(err => console.log(err))
  }
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form onSubmit={handleOnSubmit}>
        <label>Username</label>
        <input type="text" name="username" onChange={handleOnChange} value={credentials.username}/>
        <label>Password</label>
        <input type="text" name="password" onChange={handleOnChange} value={credentials.password}/>
        <button>Submit</button>
      </form>
    </>
  );
};

export default Login;
