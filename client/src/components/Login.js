import React, {useState} from "react";
import axiosWithAuth from '../auth/axiosWithAuth'

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [creds, setCreds] = useState ({
    username: '',
    password: ''
  });

  const onSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
    .post('/login', creds)
    .then(res => {
      console.log('data', res.data)
      localStorage.setItem('token', res.data.payload);
      props.history.push('/bubblepage');
      console.log('data 2', props)
    })
    .catch(error => 
      console.log('error', error));
};

const handleChange = event => {
  setCreds ({
    ...creds, 
    [event.target.name] : event.target.value
  })

  }
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <h2>Log In to Bubbles</h2>
    <form onSubmit = {onSubmit}>
        <input
          type = 'text'
          name = 'username'
          placeholder = 'username'
          value = {creds.username}
          onChange = {handleChange}
        />
      <input  
        type = 'password'
        name = 'password'
        placeholder = 'password'
        value = {creds.password}
        onChange = {handleChange}
        />
        <button> Log In </button>
      </form>
    </>
  );
};

export default Login;
