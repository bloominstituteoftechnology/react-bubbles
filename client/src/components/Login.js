import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosWithAuth  from "../utils/axiosWithAuth";

const initialState = {
  username: "",
  password: "",
  isFetching: false
};
const Login = props => {
  const [loginData, setLoginData] = useState(initialState);

  const handleChange = e => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoginData({ ...loginData, isFetching: true});
    axiosWithAuth()
    .post("http://localhost:5000/api/login", { username: loginData.username, password: loginData.password })
    .then(res => {
      console.log(res)
      localStorage.setItem("token", res.data.payload)
      props.history.push("/bubble-page")
    })
    .catch(err => console.log("Oof...sorry, an error occured"))
  }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>

      <div>
        <form onSubmit={handleSubmit}>
          <input
          lable="Username"
            type="text"
            name="username"
            placeholder="Username"
            value={loginData.username}
            onChange={handleChange}
          />
          <input
          lable="Password"
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
          />
          <button>Log In</button>
          {loginData.isFetching && "Please wait...logging you in"}
        </form>
      </div>
    </>
  );
};

export default Login;
