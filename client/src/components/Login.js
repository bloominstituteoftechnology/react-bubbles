import React, { useState } from 'react';
import axios from "axios";
import "../login.css";


const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [state, setState] = useState({username: "", password: ""});
  
  const handleChange = (e) => {
    setState({
      ...state, 
      [e.target.name]:e.target.value  
    });
}

const submit = (e) => {
    e.preventDefault();
    axios
    .post("http://localhost:5005/api/login", state)
    .then(res => {
        console.log(res);
        localStorage.setItem("token",res.data.payload);
        props.history.push("/bubblePage");
    })
    .catch(err => {
        console.log(err);
    });
}

  return (
    <>
      <div className="main">
        <h2>Login Form</h2>

        <form onSubmit={submit}>
          
            {/* <div class="imgcontainer">
                <img src="../img_avatar2.png" alt="Avatar" class="avatar" />
            </div> */}
            
            <div className="container">
                
                <label for="uname"><b>Username</b></label>            
                <input
                type="text"
                placeholder="Enter Username"
                name="username"
                value={state.username}
                onChange={handleChange}
                />    
            
                <label for="psw"><b>Password</b></label>          
                <input
                type="password"
                placeholder="Enter Password"
                name="password"
                value={state.password}
                onChange={handleChange}
                />
                    
                <button type="submit">Login</button>
            
            </div>
        </form>
              
      </div>
    </>
  );
};

export default Login;
