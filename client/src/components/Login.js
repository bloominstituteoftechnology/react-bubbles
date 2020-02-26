import React, { useState } from "react";
import axios from "axios";

const Login = props => {
  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const handleChange = event => {
    setUser({...user, [event.target.name]: event.target.value})
  }

  const handleSubmit = event => {
    event.preventDefault();
    axios.post("/api/login", user)
      .then((response) => {
        localStorage.setItem("token", response.data.payload);
        props.history.push("/bubbles");
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <Login
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        user={user}
        setUser={setUser}
      />
    </>
  );
};

export default Login;
