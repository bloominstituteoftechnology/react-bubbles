import React, { useState } from 'react';
import axios from 'axios';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [login, setLogin] = useState(
     {
      username: '',
      password: ''
    }
  );

  const handleInput = e => {
    setLogin({
        ...login,
        [e.target.name]: e.target.value
    });
    console.log(login)
  };

  const handelLogin = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", login)
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.payload);
        props.history.push("/protected");
      })
      .catch(err =>
        console.log(
          err.message
        )
      );
  };

  return (
    <>
      <form onSubmit={handelLogin}>
        <h1>
          Login
        </h1>
          <input
              type="text"
              name="username"
              value={login.username}
              onChange={handleInput}
            />
          <input
              type="password"
              name="password"
              value={login.password}
              onChange={handleInput}
            />
          <button>Log in</button>
        </form>
    </>
  );
};

export default Login;
 