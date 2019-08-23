import React, { useState } from "react";
import axios from "axios";

const Login = ({ history }) => {
  // console.log("login test:", history);
  const [user, setUser] = useState({ username: "", password: "" });
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", user)
      .then(res => {
        console.log("token test:", res);
        localStorage.setItem("token", res.data.payload);
        history.push("/protected");
      })
      .catch(err => console.error(err.response));
  };
  return (
    <>
      <div>
      <div>
      <h1>Bubbles, Bubbles, Bubbles, Bubbles Rocking everywhere!</h1>
      <hr/>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={handleChange}
          value={user.username}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
          value={user.password}
        />
        <button type="submit">Log In</button>
      </form>
      </div>
    </>
  );
};

export default Login;