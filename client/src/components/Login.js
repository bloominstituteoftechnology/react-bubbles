import React, { useState } from "react";
import axios from "axios";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const login = () => {
    axios.post("http://localhost:5000/api/login", {username, password})
      .then(res => {
        setError(false);
        localStorage.setItem("token", res.data.payload);
        props.history.push("/");
      }).catch(err => {
        setError(err.response.data.error);
      })
  }

  return (
    <div className="login">
      <h1>Welcome to the Bubble App!</h1>
      {error ? <p style={{color: "red"}}>{error}</p> : null}
      <form onSubmit={ev => {
        ev.preventDefault();
        login();
      }}>
        <label>Username
          <input
            type="text"
            value={username}
            onChange={ev => setUsername(ev.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="text"
            value={password}
            onChange={ev => setPassword(ev.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;
