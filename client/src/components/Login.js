import React, { useState } from "react";
import axios from "axios";

const Login = (props) => {
  const [login, setLogin] = useState({
    username: "",
    password: ""
  });

  function handleChange(e) {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios.post("http://localhost:5000/api/login", login)
    .then( res => {
      localStorage.setItem("token", res.data.payload)
      props.history.push("/bubblepage")
    }
    .catch( err => console.log(err))
    )
  }


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Username</h3>
          <input 
            type="text" 
            placeholder="Enter Username"
            name="username"
            onChange={handleChange}
            value={login.username}
          />
        </div>
        <div>
          <h3>Password</h3>
          <input 
            type="text" 
            placeholder="Enter Password"
            name="password"
            onChange={handleChange}
            value={login.password}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;
