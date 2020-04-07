import React from "react";
import axiosWithAuth from "../utils/axiosWithAuth.js";

const Login = props => {
  
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setCredentials({ username: '', password: '' });

    axiosWithAuth()
    .post("login", credentials)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubbles");
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  };

  return (
    <div className="login">
      <h1>Welcome to the Bubble App!</h1>
      <p>Please enter your account information below!</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" placeholder="Lambda School" value={credentials.password} onChange={handleChange} />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" placeholder="password" value={credentials.password} onChange={handleChange}  />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;