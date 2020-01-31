import React, {useState } from "react";
import axiosWithAuth from '../auth/axiosWithAuth';

const Login = (props) => {

  const [ form, setForm ] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    axiosWithAuth()
      .post(`/login`, form)
      .then((res) => {
        console.log(res);
        localStorage.setItem('token', res.data.payload);
        props.history.push(`/bubbles`);
      })
      .catch((err) => 
        console.log('Login Error', err));
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}>
          <input
            type='text'
            name='username'
            placeholder='Username'
            value={form.username}
            onChange={handleChange}
          />
          <br></br>
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={form.password}
            onChange={handleChange}
          />
          <br></br>
          <button type='submit'>Log In</button>
      </form>
    </>
  );
};

export default Login;
