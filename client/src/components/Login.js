import React, { useState } from "react";
import { axiosWithAuth } from "./axiosWithAuth";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [login, setLogin] = useState({
    username: "",
    password: ""
  });

  const changeHandler = e => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  };

  const submitHandler = e => {
    e.preventDefault();
    axiosWithAuth()
    .post("http://localhost:5000/api/login", login)
    // .then(res => console.log(res))
    .then(res => {
      localStorage.setItem("token", res.data.payload);
      props.history.push("/bubblepage");
    })
    .catch(err => {
      localStorage.removeItem("token");
      console.log(err, "Invalid Login")})
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div>
        <h3>Log In</h3>
        <form onSubmit={submitHandler} >
          <input 
          type="text"
          name="username"
          placeholder="Username"
          id="username"
          onChange={changeHandler}
          />
          <input
          type="password"
          name="password"
          placeholder="Password"
          id="password"
          onChange={changeHandler}
          />
          <button>Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
