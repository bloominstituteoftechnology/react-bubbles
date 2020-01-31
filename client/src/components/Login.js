import React, {useState} from "react";
// import axios from "axios";
import { GetToken } from "../utils/GetToken";


const Login = (props) => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  })


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  };

  const login = e => {
    e.preventDefault();
    GetToken()
      .post("/login" , form)
      .then(response => {
        console.log(response)
        localStorage.setItem("token", response.data.payload)
        props.history.push("/protected")
      })
      .catch(error => {
        console.log("ERROR", error)
      })
    
  }

  return (
    <div className="login-container">
      <h2>Log In Here!</h2>
      <form onSubmit={login}>
        <input 
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Enter Username"
        />
        <input 
          type="text"
          name="password"
          onChange={handleChange}
          value={form.password}
          placeholder="Enter password"
        />
        <button>Log In</button>
      </form>
    </div>
  );
};

export default Login;
