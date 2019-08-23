import React, { useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
    console.log(credentials);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/login', credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        props.history.push('/bubbles');
        console.log(res.data.payload);
      })
      .catch(err => {
        console.log(credentials);
        console.log(err.response);
      })
  }


  return (
    <>
      <Link to='/bubbles'>Bubbles Page</Link>
      <form
        onSubmit={handleSubmit}>
        <input
          type="text"
          name='username'
          value={credentials.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name='password'
          value={credentials.password}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </>
  );
};
export default Login;