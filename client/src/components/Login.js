import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const emptyCredentials = {
  username: '',
  password: '',
};

const Login = () => {
  const history = useHistory();
  const [credentials, setCredentials] = useState(emptyCredentials);

  const handleChange = event => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  // make a post request to retrieve a token from the api
  const handleSubmit = event => {
    event.preventDefault();
    axiosWithAuth()
      .post('/api/login', credentials)
      .then(res => {
        // res.data.payload
        console.log(res);
        localStorage.setItem('token', JSON.stringify(res.data.payload));
        history.push('/protected');
      })
      .catch(err => console.log(err.response));
  };

  // when you have handled the token, navigate to the BubblePage route


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div>
        <form onSubmit={handleSubmit}>  
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
          <button>Log in</button>
        </form>
      </div>
    </>
  );
};

export default Login;
