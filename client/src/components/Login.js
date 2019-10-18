import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const Login = (props) => {

  const [ user, setUser ] = useState({
    username: '',
    password: ''
  })

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const submitLogin = e => {
    e.preventDefault();
    axiosWithAuth()
    .post('/login', user)
    .then(res => {
      localStorage.setItem('token', res.data.payload)
      props.history.push('/protected')
    })
    .catch(err => console.log(err))
  }


  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <div className="login-form">
      <form onSubmit={submitLogin}>
        <input text="name" name="username" value={user.username} placeholder="Username" onChange={handleChange} />

        <input text="password" name="password" value={user.password} placeholder="Password" onChange={handleChange} />

        <button>Log In</button>
      </form>
    </div>
  );
};

export default Login;
