import React from "react";

import axiosWithAuth from '../utils/axiosWithAuth';

const Login = props => {
  const [user, setUser] = React.useState({
    username: '',
    password: ''
  });

  const handleChanges = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/login', user)
      .then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.payload);
        props.history.push('/bubbles');
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  return (
      <div> 
      <h1>Welcome to the Bubble App!</h1>
        <form onSubmit={login}>
          <input
            type='text'
            name='username'
            placeholder='Username'
            value={user.username}
            onChange={handleChanges}
          />
          <input
            type='text'
            name='password'
            placeholder='Password'
            value={user.password}
            onChange={handleChanges}
          />
          <div>
            <button className='login' type='submit'>Login</button>
          </div>
        </form>
      </div>
  );
};

export default Login;
