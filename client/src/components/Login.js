import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialState = {
  username: "",
  password: "",
  isFetching: false
};
const Login = props => {
  const {login, setLogin} = useState(initialState);

  const handleChange = e => {
    setLogin({ ...login, [e.target.name]: e.target.walue });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLogin({ ...login, isFetching: true});
    axiosWithAuth()
    .post("/api/login", login)
    .then(res => {
      localStorage.setItem("token")
      props.history.push("/bubble-page")
    .catch(err => console.log("Oof...sorry, an error occured"))
    })
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
            value={login.username}
            onChange={handleChange}
          />
          <input
          lable="Password"
            type="text"
            name="password"
            placeholder="Password"
            value={login.password}
            onChange={handleChange}
          />
          <button>Log In</button>
          {login.isFetching && "Please wait...logging you in"}
        </form>
      </div>
    </>
  );
};

export default Login;
