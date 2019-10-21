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
    <div className="signin">
      <h2>Sign In</h2>
      <form className="login-form" onSubmit={login}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            placeholder="Enter Username"
            onChange={handleChange}
            value={user.username}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            value={user.password}
          />
        </div>
        <div>
          <button className="btn">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
