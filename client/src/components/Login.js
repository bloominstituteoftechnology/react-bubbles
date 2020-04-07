import React, { useState } from "react";
import { axiosWithAuth } from './axiosAuth';


const Login = (props) => {
  const [userCredentials, setUserCredentials] = useState({ username: 'Lambda School', password: 'i<3Lambd4' })
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route


  const handleChange = e => {
    setUserCredentials({

      ...userCredentials,
      [e.target.name]: e.target.value

    });
  };

  const login = e => {
    e.preventDefault();
    axiosWithAuth().post('/login', userCredentials)
      .then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.payload);
        props.history.push('/BubblePages');
      })
      .catch(err => { console.log('get token failed', err) })

  }



  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={login}>
        <input
          type="text"
          name="username"
          value={userCredentials.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={userCredentials.password}
          onChange={handleChange}
        />
        <button>Log in</button>
      </form>
    </>
  );
};

export default Login;
