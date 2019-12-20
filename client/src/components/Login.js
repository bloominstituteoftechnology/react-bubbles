import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [loginUserText, setLoginUserText] = React.useState({
    username: "",
    password: ""
  });
  const [isLoading, setLoading] = React.useState(false);

  const handleChange = e => {
    e.preventDefault();
    setLoginUserText({
      ...loginUserText,
      [e.target.name]: e.target.value
    });
    console.log(loginUserText);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(!isLoading);
    axiosWithAuth()
      .post("login", loginUserText)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubble-page");
      })
      .catch(err => console.log(err));
  };
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <label />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={loginUserText.username}
          onChange={handleChange}
        />
        <label />
        <input
          type="text"
          name="password"
          placeholder="Password"
          value={loginUserText.password}
          onChange={handleChange}
        />
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
