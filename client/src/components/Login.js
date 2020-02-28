import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [login, setLogin] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("login", login)
      .then(res => {
        window.localStorage.setItem("token", res.data.payload);
        props.history.push("/main");
      })
      .catch(err => {
        console.log(err);
      });
  };

  // console.log(login);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="text">
          username
          <input
            type="text"
            name="username"
            value={props.username}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          password
          <input
            type="password"
            name="password"
            value={props.password}
            onChange={handleChange}
          />
        </label>
        <button>login</button>
      </form>
    </div>
  );
};

export default Login;
