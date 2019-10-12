import React, { useState } from "react";
import { axiosWithAuth } from "../utils/AxiosWithAuth";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  console.log(props);
  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", user)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubblespage");
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      <form className="login-form" onSubmit={login}>
        <label htmlFor="username">
          Username
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={user.username}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={user.password}
          />
        </label>
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
