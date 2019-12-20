import React, { useState } from "react";
import AxiosWithAuth from "../utilz/AxiosWithAuth";

const Login = (e) => {

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const [isFetching, setIsFetching] = useState(false)


  const login = e => {
    e.preventDefault();
    setIsFetching(true);
    AxiosWithAuth()
    .post('/login', credentials)
    .then(res => {
      localStorage.setItem('token', res.data.payload);
      PaymentResponse.history.push('/')
    })
    .catch(err => console.log(err))
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
