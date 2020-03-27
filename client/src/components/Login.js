import React, {useState} from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth'

const Login = props => {


  //set state of login credentials
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })

  //handle state change of login credentials
  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
    console.log('handleChange results: ', credentials)
  }

  //login authentication function
  const login = e => {
    e.preventDefault();

    axiosWithAuth()
    .post('/api/login', credentials)
    .then(res => {
      console.log('login response: ', res);
      localStorage.setItem('token', res.data.payload);
      props.history.push('/protected');
    })
    .catch(err => {
      console.log('login error: ', err)
    })

  }



  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <div>
        <form onSubmit={login}>
          <input 
            type='text'
            name='username'
            placeholder='Enter Username'
            value={credentials.username}
            onChange={handleChange}
          />
          <input 
            type='password'
            name='password'
            placeholder='Enter Password'
            value={credentials.password}
            onChange={handleChange}
          />
          <button>Log In</button>
        </form>
      </div>
    </>
  );
};

export default Login;
