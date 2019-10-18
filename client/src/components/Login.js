import React, { useState } from "react";

import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = props => {
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
      .post('/login', formInput)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        props.history.push('/bubbles')
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
      <>

        <div>

          <form>
            <input
              id="outlined-adornment-username"
              variant="outlined"
              label="User Name"
              name='username'
              value={formInput.username}
              onChange={handleChange}
            />
            <input
              id="outlined-adornment-password"
              variant="outlined"
              // add hidden text feature
              name='password'
              label="Password"
              value={formInput.password}
              onChange={handleChange}
            />
            <button variant="contained" onClick={handleSubmit}>
              Login
            </button>
          </form>
        </div>
      </>
    </>
  );
};

export default Login;
