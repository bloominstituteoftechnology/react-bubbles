import React from "react";
import axios from "axios";


const Login = (props) => {
  const userCredentials = { username: 'Lambda School', password: 'i<3Lambd4' };
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  axios.post('/api/login', userCredentials)
    .then(res => {
      localStorage.setItem('token', res.data.token);
      props.history.push('/bubblepage');
    }
    )

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
    </>
  );
};

export default Login;
