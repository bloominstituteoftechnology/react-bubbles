import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const history = useHistory();

  const handleChange = e => {
    e.preventDefault();
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const login = e => {
    e.preventDefault();

    axios
      .post(`http://localhost:4000/api/login`, state)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        history.push('/protected');
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <div>
        <form onSubmit={login}>
          <input
            type="text"
            name="username"
            value={state.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
          />
          <button>Log in</button>
        </form>
      </div>
    </>
  );
};

export default Login;
