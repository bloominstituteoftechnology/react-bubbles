import React, { useState } from "react";
import { connect } from "react-redux";
import { loginAuth } from "../actions/axiosActions";

const Login = props => {
  console.log(props);
  const [values, setValues] = useState({
    username: "",
    password: ""
  });
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const onChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  if (sessionStorage.getItem("token")) props.history.push("/bubblePage");

  const onSubmit = event => {
    event.preventDefault();
    props.loginAuth(values);
    props.history.push("/bubblePage");
  };
  console.log(sessionStorage);

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <h3>Login Please</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">UserName: </label>
        <input
          name="username"
          id="username"
          onChange={onChange}
          value={values.username}
        />
        <label htmlFor="password">Password: </label>
        <input
          name="password"
          id="password"
          onChange={onChange}
          value={values.password}
        />
        <button>Login</button>
      </form>
    </>
  );
};

export default connect(state => state, { loginAuth })(Login);
