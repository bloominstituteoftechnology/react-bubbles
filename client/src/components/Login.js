import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialState = {
  username: "",
  password: "",
  isFetching: false
};

const Login = props => {
  const [data, setData] = useState(initialState);

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setData({ ...data, isFetching: true });
    axiosWithAuth()
      .post("/login", data)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubble-page");
      })
      .catch(err => console.log("sorry, an error has occured", err));
  };
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      {/* <p>Build a login page here</p> */}
      <div>
        <form onSubmit={handleSubmit}>
          <input
          type="text"
          name="username"
          placeholder="Username"
          value={data.username}
          onChange={handleChange}
          />

          <input
          type="text"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          />

          <button>Log In</button>
          {data.isFetching && "Please wait...logging you in"}
        </form>
      </div>
    </>
  );
};

export default Login;
