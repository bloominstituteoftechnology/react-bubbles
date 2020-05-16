import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"

const Login = (props) => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const credentials = {username: username, password: password}
  // make a post request to retrieve a token from the api
    const logon = (e) =>{
      e.preventDefault()
      axios
    .post("http://localhost:5000/api/login", credentials)
    .then(res =>{
      localStorage.setItem("token", res.data.payload);
      props.history.push("/BubblePage")
    })
    .catch(err => {
      console.log(err);
    })
  }

  const onChangeUsername = (e) => {
    e.preventDefault();
    setUsername(e.target.value)
  }

  const onChangePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value)
  }
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
    <nav>
      <Link path="/">Login</Link>
      <Link path="/BubblePage">BubblePage</Link>
    </nav>
      <form onSubmit={logon}>
        <input 
        type="text"
        placeholder="enter a username"
        name="username"
        onChange={onChangeUsername}/>
        <input 
        type="password"
        placeholder="enter a password"
        name="password"
        onChange={onChangePassword}/>
        <button>Don't Forget The Button</button>
      </form>
    </>
  );
};

export default Login;
