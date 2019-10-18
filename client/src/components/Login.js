import React, { useState } from "react";

const Login = () => {
  const [formInput, setFormInput] = useState({ username: '', password: '' })

  const handleChange = e => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = e => {
    e.preventDefault();

    axiosWithAuth()
      .post('{//appendation to API url//', formInput)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        props.history.push('{/*post-login URL*/')
      })
      .catch(err => console.log(err.response))
    // Call Login axios function
  }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
    </>
  );
};

export default Login;
