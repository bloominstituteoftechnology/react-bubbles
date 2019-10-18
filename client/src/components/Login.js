import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';


const emptyForm = { username: '', password: '' }


const Login = props => {
  const [credentials, setCredentials] = useState(emptyForm)
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route*//
  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth().post('/login', credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        setCredentials(emptyForm);
        props.history.push('/bubbles')
      })
      .catch(err => console.log(err))
  }
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button type="submit">Log in</button>
      </form>
    </>
  );
};

export default Login;
